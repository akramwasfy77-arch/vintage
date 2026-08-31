'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/data';
import { fetchAds } from '@/lib/db';
import AdCard from '@/components/AdCard';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAds({ limit: 12 }).then((r) => { setAds(r.rows); setLoading(false); }); }, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,#D9770622,transparent_70%)]" />
        <div className="container-p relative py-10 sm:py-16 text-center">
          <h1 className="h1 leading-snug">كراكيب <span className="gold">وتحف</span></h1>
          <p className="mt-3 text-muted text-[15px]">المنصة الأولى في مصر لبيع التحف والمقتنيات النادرة</p>
          <form action="/search" className="mt-6 flex gap-2 max-w-xl mx-auto">
            <input name="q" value={q} onChange={(e) => setQ(e.target.value)} className="input" placeholder="ابحث عن تحفة، ساعة، عملة..." />
            <button className="btn-primary">بحث</button>
          </form>
          <div className="mt-4 flex gap-2 justify-center">
            <Link href="/add-ad" className="btn-primary">أضف إعلانك</Link>
            <Link href="/how-it-works" className="btn-ghost">إزاي يشتغل؟</Link>
          </div>
        </div>
      </section>

      <section className="container-p py-8">
        <h2 className="font-bold mb-4">الأقسام</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category?c=${c.slug}`} className="card p-4 text-center hover:border-primary transition">
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-2 text-sm font-medium leading-snug">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-p pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">أحدث الإعلانات</h2>
          <Link href="/search" className="text-sm gold">عرض الكل ←</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="card h-56 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ads.map((a) => <AdCard key={a.id} ad={a} />)}
          </div>
        )}
      </section>
    </div>
  );
}
