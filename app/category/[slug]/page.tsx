import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/data';
import { getAds } from '@/lib/server-db';
import AdCard from '@/components/AdCard';
import Filters from '@/components/Filters';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SITE, canonical, breadcrumb } from '@/lib/site';

export const revalidate = 300;
export function generateStaticParams() { return CATEGORIES.map((c) => ({ slug: c.slug })); }

const INTRO: Record<string, string> = {
  antiques: 'قسم التحف والأنتيك على Vintage يضم القطع الأصلية من الأنتيك الفرنسي والعثماني والمصري، إلى جانب التماثيل البرونزية والرخامية والمزهريات النحاسية والخزفية. كل قطعة معروضة بوصف تفصيلي لحالتها وعمرها التقريبي وأبعادها، مع صور واضحة وتواصل مباشر مع البائع.',
  'art-decor': 'قسم الفنون والديكور يجمع اللوحات الزيتية والمائية، السيراميك المرسوم يدوياً، النجف الكريستال والنحاسي، المرايا المذهّبة، والسجاد الشرقي المنسوج يدوياً. قطع تصلح لتأثيث المنازل الكلاسيكية والمكاتب الفاخرة وصالات العرض.',
  'watches-jewelry': 'قسم الساعات والمجوهرات يعرض الساعات الكلاسيكية الميكانيكية وساعات الحائط والجيب، المجوهرات العتيقة بتصاميم تاريخية، والفضيات من أطقم الشاي إلى العلب المزخرفة. مع بيان حالة الحركة والخامة لكل قطعة.',
  'books-docs': 'قسم الكتب والوثائق مخصص للكتب النادرة والطبعات الأولى، المخطوطات، العملات الورقية والمعدنية من العهود المصرية المختلفة، والطوابع البريدية النادرة. وجهة أساسية لهواة جمع الوثائق والعملات.',
  'classic-furniture': 'قسم الأثاث الكلاسيكي يضم أطقم لويس بالحفر اليدوي والتذهيب، الطرابيزات والكراسي الخشبية، والمكتبات القديمة. كل إعلان يوضح نوع الخشب وحالة الهيكل والتنجيد والمقاسات.',
  'vintage-electronics': 'قسم الإلكترونيات الكلاسيكية يعرض الراديوهات القديمة بصناديقها الخشبية، أجهزة الجراموفون والفونوغراف، وكاميرات التصوير الفيلمية. تُذكر حالة التشغيل بوضوح في كل إعلان.',
  'rare-collectibles': 'قسم المقتنيات النادرة يشمل الألعاب القديمة، المذكرات والصور التاريخية، الأعلام والقمصان الرياضية، وتذاكر المباريات والحفلات التاريخية — لهواة جمع القطع ذات القيمة الوجدانية والتوثيقية.',
  'used-misc': 'قسم المتنوعات المستعملة يضم الحقائب الفينتاج، الملابس الكلاسيكية، والقطع المميزة التي لا تندرج تحت الأقسام الأخرى، بحالات وأسعار متنوعة.',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return {};
  const title = `${cat.name} للبيع في مصر`;
  const description = `${cat.name} للبيع على Vintage — ${cat.subs.join('، ')}. تصفح الإعلانات بالأسعار بالجنيه المصري وتواصل مباشرة مع البائع.`;
  return {
    title, description,
    alternates: { canonical: canonical(`/category/${cat.slug}`) },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: canonical(`/category/${cat.slug}`), type: 'website' },
  };
}

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams: any }) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const { rows } = await getAds({
    category: cat.slug, q: searchParams.q, location: searchParams.loc,
    min: searchParams.min ? Number(searchParams.min) : undefined,
    max: searchParams.max ? Number(searchParams.max) : undefined,
  });

  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الأقسام', path: '/search' }, { name: cat.name, path: `/category/${cat.slug}` }];

  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'CollectionPage',
          name: `${cat.name} للبيع في مصر`, description: INTRO[cat.slug], url: canonical(`/category/${cat.slug}`), inLanguage: 'ar-EG',
          mainEntity: { '@type': 'ItemList', itemListElement: rows.slice(0, 30).map((a: any, i: number) => ({ '@type': 'ListItem', position: i + 1, url: canonical(`/ad/${a.id}`), name: a.title })) },
        }),
      }} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">{cat.icon} قسم</p>
      <h1 className="h1 mt-2">{cat.name} للبيع في مصر</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">{INTRO[cat.slug]}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {cat.subs.map((s) => (
          <a key={s} href={`/category/${cat.slug}?q=${encodeURIComponent(s)}`} className="chip-gold">{s}</a>
        ))}
      </div>

      <div className="mt-6"><Filters action={`/category/${cat.slug}`} sp={searchParams} lockCategory /></div>

      <h2 className="h2 mt-8">
        {rows.length ? `${rows.length} إعلان في ${cat.name}` : `لا توجد إعلانات حالياً في ${cat.name}`}
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {rows.map((a: any) => <AdCard key={a.id} ad={a} />)}
      </div>
      {!rows.length && <p className="prose-ar mt-3 text-muted">كن أول من يعرض قطعة في هذا القسم — <a href="/add-ad" className="link-gold">أضف إعلانك</a>.</p>}
    </div>
  );
}
