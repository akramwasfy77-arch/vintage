import { createClient } from '@supabase/supabase-js';
import { DEMO_ADS } from './demo';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const dbReady = Boolean(url && key);

export const sdb = createClient(url || 'https://placeholder.supabase.co', key || 'anon', {
  auth: { persistSession: false },
});

const RANK: Record<string, number> = { premium: 4, featured: 3, special: 2, basic: 1 };

export type Filters = { category?: string; q?: string; min?: number; max?: number; location?: string; limit?: number };

function filterDemo(f: Filters) {
  let rows = [...DEMO_ADS];
  if (f.category) rows = rows.filter((r) => r.category === f.category);
  if (f.location) rows = rows.filter((r) => r.location === f.location);
  if (f.q) rows = rows.filter((r) => (r.title + r.description).includes(f.q!));
  if (f.min != null) rows = rows.filter((r) => r.price_egp >= f.min!);
  if (f.max != null) rows = rows.filter((r) => r.price_egp <= f.max!);
  rows.sort((a, b) => (RANK[b.package] || 0) - (RANK[a.package] || 0));
  return rows.slice(0, f.limit || 60);
}

export async function getAds(f: Filters = {}): Promise<{ rows: any[]; demo: boolean }> {
  if (!dbReady) return { rows: filterDemo(f), demo: true };
  let q = sdb.from('ads').select('*').eq('status', 'approved');
  if (f.category) q = q.eq('category', f.category);
  if (f.location) q = q.eq('location', f.location);
  if (f.min != null) q = q.gte('price_egp', f.min);
  if (f.max != null) q = q.lte('price_egp', f.max);
  if (f.q) q = q.or(`title.ilike.%${f.q}%,description.ilike.%${f.q}%`);
  const { data, error } = await q.order('created_at', { ascending: false }).limit(f.limit || 60);
  if (error || !data) return { rows: [], demo: false };
  return { rows: data.sort((a: any, b: any) => (RANK[b.package] || 0) - (RANK[a.package] || 0)), demo: false };
}

export async function getAd(id: string): Promise<any | null> {
  if (!dbReady || id.startsWith('demo-')) return DEMO_ADS.find((a) => a.id === id) || null;
  const { data } = await sdb.from('ads').select('*').eq('id', id).eq('status', 'approved').maybeSingle();
  return data;
}

export async function getAdIds(): Promise<string[]> {
  if (!dbReady) return DEMO_ADS.map((a) => a.id);
  const { data } = await sdb.from('ads').select('id').eq('status', 'approved').limit(2000);
  return (data || []).map((r: any) => r.id);
}
