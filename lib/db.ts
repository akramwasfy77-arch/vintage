'use client';
import { supabase, supabaseReady } from './supabase';

export const DEMO_ADS: any[] = [
  { id: 'demo-1', title: 'مزهرية عثمانية نحاسية مطعّمة بالفضة', price_egp: 4500, category: 'antiques', subcategory: 'مزهريات', location: 'القاهرة', package: 'premium', photos: [], description: 'قطعة أصلية من أواخر القرن التاسع عشر، حالة ممتازة.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 120 },
  { id: 'demo-2', title: 'ساعة حائط فرنسية 1920 تعمل بالمفتاح', price_egp: 7800, category: 'watches-jewelry', subcategory: 'ساعات كلاسيكية', location: 'الإسكندرية', package: 'featured', photos: [], description: 'ساعة أصلية بحالة عمل ممتازة مع المفتاح الأصلي.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 88 },
  { id: 'demo-3', title: 'جراموفون His Master\u2019s Voice بالبوق', price_egp: 15000, category: 'vintage-electronics', subcategory: 'جراموفون', location: 'الجيزة', package: 'special', photos: [], description: 'قطعة نادرة لهواة المقتنيات، صوت نقي.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 210 },
  { id: 'demo-4', title: 'طقم أنتريه لويس كامل خشب زان', price_egp: 32000, category: 'classic-furniture', subcategory: 'لويس', location: 'القليوبية', package: 'basic', photos: [], description: 'حفر يدوي، قماش جديد.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 45 },
  { id: 'demo-5', title: 'مجموعة عملات ملكية مصرية نادرة', price_egp: 2600, category: 'books-docs', subcategory: 'عملات', location: 'المنصورة', package: 'basic', photos: [], description: '12 قطعة من عهد الملك فاروق.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 67 },
  { id: 'demo-6', title: 'سجادة شرقية يدوية صوف طبيعي', price_egp: 9500, category: 'art-decor', subcategory: 'سجاد شرقي', location: 'الغربية', package: 'special', photos: [], description: 'مقاس 3×2 متر، ألوان طبيعية.', seller_phone: '01029397797', status: 'approved', created_at: new Date().toISOString(), view_count: 30 },
];

const RANK: Record<string, number> = { premium: 4, featured: 3, special: 2, basic: 1 };

export type AdFilters = { category?: string; q?: string; min?: number; max?: number; location?: string; limit?: number };

export async function fetchAds(f: AdFilters = {}) {
  if (!supabaseReady) {
    let rows = [...DEMO_ADS];
    if (f.category) rows = rows.filter((r) => r.category === f.category);
    if (f.location) rows = rows.filter((r) => r.location === f.location);
    if (f.q) rows = rows.filter((r) => (r.title + r.description).includes(f.q!));
    if (f.min != null) rows = rows.filter((r) => r.price_egp >= f.min!);
    if (f.max != null) rows = rows.filter((r) => r.price_egp <= f.max!);
    rows.sort((a, b) => (RANK[b.package] || 0) - (RANK[a.package] || 0));
    return { rows: rows.slice(0, f.limit || 60), demo: true };
  }
  let q = supabase.from('ads').select('*').eq('status', 'approved');
  if (f.category) q = q.eq('category', f.category);
  if (f.location) q = q.eq('location', f.location);
  if (f.min != null) q = q.gte('price_egp', f.min);
  if (f.max != null) q = q.lte('price_egp', f.max);
  if (f.q) q = q.or(`title.ilike.%${f.q}%,description.ilike.%${f.q}%`);
  const { data, error } = await q.order('created_at', { ascending: false }).limit(f.limit || 60);
  if (error) return { rows: [], demo: false, error: error.message };
  const rows = (data || []).sort((a: any, b: any) => (RANK[b.package] || 0) - (RANK[a.package] || 0));
  return { rows, demo: false };
}

export async function fetchAd(id: string) {
  if (!supabaseReady || id.startsWith('demo-')) return DEMO_ADS.find((a) => a.id === id) || null;
  const { data } = await supabase.from('ads').select('*').eq('id', id).single();
  if (data) supabase.rpc('increment_view', { ad_id: id }).then(() => {}, () => {});
  return data;
}
