'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAd } from '@/lib/db';
import { catName, egp, waLink } from '@/lib/data';

export default function Page() {
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id') || '';
    fetchAd(id).then((a) => { setAd(a); setLoading(false); });
  }, []);

  if (loading) return <div className="container-p py-10 text-muted">جارٍ التحميل…</div>;
  if (!ad) return <div className="container-p py-10">الإعلان غير موجود. <Link href="/search" className="gold">تصفح الإعلانات</Link></div>;

  const photos: string[] = Array.isArray(ad.photos) ? ad.photos : [];

  return (
    <div className="container-p py-5 grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] bg-surface2 grid place-items-center">
            {photos.length ? <img src={photos[i]} alt={ad.title} className="w-full h-full object-contain" /> : <span className="text-6xl opacity-30">🏺</span>}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2 p-2 overflow-x-auto scroll-x">
              {photos.map((p, idx) => (
                <img key={idx} src={p} onClick={() => setI(idx)} alt="" className={`h-16 w-16 object-cover rounded-lg cursor-pointer ${idx === i ? 'ring-2 ring-primary' : 'opacity-70'}`} />
              ))}
            </div>
          )}
        </div>
        <h1 className="h1 mt-4 leading-snug">{ad.title}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="chip">{catName(ad.category)}</span>
          {ad.subcategory && <span className="chip">{ad.subcategory}</span>}
          {ad.location && <span className="chip">📍 {ad.location}</span>}
          <span className="chip">👁 {ad.view_count || 0}</span>
        </div>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-[15px]">{ad.description}</p>
      </div>

      <aside className="lg:sticky lg:top-20 h-fit card p-4">
        <div className="text-2xl font-bold gold">{egp(ad.price_egp)}</div>
        <div className="mt-4 grid gap-2">
          <a href={waLink(ad.seller_whatsapp || ad.seller_phone, ad.title)} target="_blank" rel="noopener" className="btn-primary">💬 واتساب البائع</a>
          <a href={`tel:${ad.seller_phone}`} className="btn-ghost">📞 اتصال — {ad.seller_phone}</a>
        </div>
        <p className="mt-4 text-xs text-muted leading-relaxed">
          عاين القطعة قبل الدفع، وتجنّب أي تحويل مالي مقدّم. كراكيب وتحف منصة إعلانية ولا تتدخل في عمليات البيع.
        </p>
      </aside>
    </div>
  );
}
