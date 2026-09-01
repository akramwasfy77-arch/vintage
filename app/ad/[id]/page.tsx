import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAd, getAdIds } from '@/lib/server-db';
import { catName, egp, waLink, CATEGORIES } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import Gallery from '@/components/Gallery';
import { SITE, canonical, breadcrumb } from '@/lib/site';

export const revalidate = 120;
export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await getAdIds();
  return ids.slice(0, 200).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ad = await getAd(params.id);
  if (!ad) return { title: 'الإعلان غير موجود' };
  const description = `${ad.title} للبيع بسعر ${egp(ad.price_egp)}${ad.location ? ` في ${ad.location}` : ''}. ${String(ad.description).slice(0, 130)}`;
  const image = Array.isArray(ad.photos) && ad.photos[0] ? ad.photos[0] : undefined;
  return {
    title: ad.title, description,
    alternates: { canonical: canonical(`/ad/${ad.id}`) },
    openGraph: { title: `${ad.title} | ${SITE.name}`, description, url: canonical(`/ad/${ad.id}`), type: 'article', images: image ? [image] : undefined },
    twitter: { card: 'summary_large_image', title: ad.title, description, images: image ? [image] : undefined },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const ad = await getAd(params.id);
  if (!ad) notFound();

  const cat = CATEGORIES.find((c) => c.slug === ad.category);
  const crumbs = [
    { name: 'الرئيسية', path: '/' },
    { name: cat?.name || 'الأقسام', path: cat ? `/category/${cat.slug}` : '/search' },
    { name: ad.title, path: `/ad/${ad.id}` },
  ];

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ad.title,
    description: ad.description,
    image: Array.isArray(ad.photos) && ad.photos.length ? ad.photos : undefined,
    category: catName(ad.category),
    url: canonical(`/ad/${ad.id}`),
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      price: Number(ad.price_egp),
      priceCurrency: 'EGP',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: canonical(`/ad/${ad.id}`),
      areaServed: ad.location || 'Egypt',
      seller: { '@type': 'Person', name: 'بائع على Vintage' },
    },
  };

  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <Breadcrumbs items={crumbs} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Gallery photos={Array.isArray(ad.photos) ? ad.photos : []} title={ad.title} />
          <h1 className="h1 mt-6">{ad.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`/category/${ad.category}`} className="chip-gold">{catName(ad.category)}</Link>
            {ad.subcategory && <span className="chip">{ad.subcategory}</span>}
            {ad.location && <span className="chip">{ad.location}</span>}
          </div>

          <h2 className="h2 mt-8">وصف القطعة</h2>
          <p className="prose-ar mt-3 whitespace-pre-wrap">{ad.description}</p>

          <h2 className="h2 mt-8">تفاصيل الإعلان</h2>
          <dl className="card-lux mt-3 grid gap-px overflow-hidden text-sm sm:grid-cols-2">
            {[
              ['السعر', egp(ad.price_egp)],
              ['القسم', catName(ad.category)],
              ['القسم الفرعي', ad.subcategory || '—'],
              ['المحافظة', ad.location || '—'],
              ['الحالة', 'مستعمل / قطعة أصلية'],
              ['العملة', 'الجنيه المصري (EGP)'],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between gap-4 bg-surface/60 px-5 py-3.5">
                <dt className="text-muted">{k}</dt><dd className="font-medium">{v as string}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="card-lux p-6">
            <p className="eyebrow">السعر المطلوب</p>
            <p className="mt-1 font-display text-3xl font-bold text-gold-light">{egp(ad.price_egp)}</p>
            <div className="mt-6 grid gap-2.5">
              <a href={waLink(ad.seller_whatsapp || ad.seller_phone, ad.title)} target="_blank" rel="noopener nofollow" className="btn-gold">تواصل عبر واتساب</a>
              <a href={`tel:${ad.seller_phone}`} className="btn-outline">اتصال هاتفي — {ad.seller_phone}</a>
            </div>
            <div className="rule my-6" />
            <p className="prose-ar !text-[13px] !leading-7 text-muted">
              عاين القطعة على الطبيعة قبل الدفع، وتجنّب أي تحويل مالي مقدّم. Vintage منصة إعلانية ولا تتدخل في عمليات البيع أو الشحن.
            </p>
          </div>
          <Link href="/add-ad" className="btn-ghost mt-3 w-full">عندك قطعة مشابهة؟ اعرضها</Link>
        </aside>
      </div>
    </div>
  );
}
