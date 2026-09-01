import type { Metadata } from 'next';
import { getAds } from '@/lib/server-db';
import AdCard from '@/components/AdCard';
import Filters from '@/components/Filters';
import Breadcrumbs from '@/components/Breadcrumbs';
import { canonical, breadcrumb } from '@/lib/site';

export const revalidate = 120;

export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
  const q = searchParams?.q;
  const title = q ? `نتائج البحث عن "${q}"` : 'تصفح كل التحف والمقتنيات المعروضة';
  return {
    title,
    description: q
      ? `نتائج البحث عن ${q} بين إعلانات التحف والأنتيك والمقتنيات النادرة على Vintage، بأسعار بالجنيه المصري وتواصل مباشر مع البائع.`
      : 'تصفح كل إعلانات التحف والأنتيك والمقتنيات النادرة على Vintage مع فلاتر بالقسم والسعر والمحافظة.',
    alternates: { canonical: canonical('/search') },
    robots: q ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const { rows } = await getAds({
    q: searchParams.q, category: searchParams.c, location: searchParams.loc,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
  });
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'تصفح الإعلانات', path: '/search' }];

  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <Breadcrumbs items={crumbs} />
      <h1 className="h1">{searchParams.q ? `نتائج البحث عن "${searchParams.q}"` : 'كل التحف والمقتنيات المعروضة'}</h1>
      <p className="prose-ar mt-3 max-w-3xl text-muted">
        استخدم الفلاتر للوصول إلى القطعة المناسبة حسب القسم والمحافظة ونطاق السعر بالجنيه المصري. الإعلانات المميزة تظهر أولاً.
      </p>
      <div className="mt-6"><Filters action="/search" sp={searchParams} /></div>
      <h2 className="h2 mt-8">{rows.length} إعلان</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">{rows.map((a: any) => <AdCard key={a.id} ad={a} />)}</div>
      {!rows.length && <p className="prose-ar mt-3 text-muted">لا توجد نتائج مطابقة. جرّب توسيع نطاق السعر أو إزالة فلتر المحافظة.</p>}
    </div>
  );
}
