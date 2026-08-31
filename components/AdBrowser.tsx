'use client';
import { useEffect, useState } from 'react';
import { CATEGORIES, GOVERNORATES, catName } from '@/lib/data';
import { fetchAds } from '@/lib/db';
import AdCard from './AdCard';

export default function AdBrowser({ lockCategory }: { lockCategory?: boolean }) {
  const [f, setF] = useState<any>({ category: '', q: '', min: '', max: '', location: '' });
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setF((s: any) => ({ ...s, category: p.get('c') || '', q: p.get('q') || '' }));
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchAds({
      category: f.category || undefined,
      q: f.q || undefined,
      location: f.location || undefined,
      min: f.min ? Number(f.min) : undefined,
      max: f.max ? Number(f.max) : undefined,
    }).then((r) => { if (!alive) return; setRows(r.rows); setDemo(!!r.demo); setLoading(false); });
    return () => { alive = false; };
  }, [f.category, f.q, f.min, f.max, f.location]);

  return (
    <div className="container-p py-6">
      <h1 className="h1 mb-4">{f.category ? catName(f.category) : 'كل الإعلانات'}</h1>

      <div className="card p-3 grid gap-2 sm:grid-cols-5">
        <input className="input sm:col-span-2" placeholder="كلمة البحث" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
        {!lockCategory && (
          <select className="input" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
            <option value="">كل الأقسام</option>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        )}
        <select className="input" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })}>
          <option value="">كل المحافظات</option>
          {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <div className="flex gap-2">
          <input className="input" inputMode="numeric" placeholder="من" value={f.min} onChange={(e) => setF({ ...f, min: e.target.value })} />
          <input className="input" inputMode="numeric" placeholder="إلى" value={f.max} onChange={(e) => setF({ ...f, max: e.target.value })} />
        </div>
      </div>

      {demo && <p className="mt-3 text-xs text-muted">عرض بيانات تجريبية — يتم استبدالها بالإعلانات الحقيقية بعد ربط قاعدة البيانات.</p>}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {loading ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="card h-56 animate-pulse" />)
          : rows.length ? rows.map((a) => <AdCard key={a.id} ad={a} />)
          : <p className="col-span-full text-center text-muted py-12">لا توجد إعلانات مطابقة.</p>}
      </div>
    </div>
  );
}
