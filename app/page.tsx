import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/data';
import { getAds } from '@/lib/server-db';
import AdCard from '@/components/AdCard';
import SearchBox from '@/components/SearchBox';
import { SITE, canonical } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: canonical('/') },
};

const FAQ = [
  { q: 'ما هو موقع Vintage؟', a: 'Vintage سوق إلكتروني مصري متخصص في بيع وشراء التحف والأنتيك والمقتنيات النادرة، يجمع البائعين والمشترين في مكان واحد مع مراجعة يدوية لكل إعلان قبل نشره.' },
  { q: 'كيف أبيع قطعة أنتيك على Vintage؟', a: 'أنشئ حساباً، اضغط "أضف إعلانك"، اكتب وصف القطعة وسعرها بالجنيه المصري، ارفع من صورة إلى عشر صور، اختر باقة الإعلان، ثم حوّل قيمتها عبر فودافون كاش وأدخل رقم العملية. يُنشر الإعلان بعد التحقق من التحويل.' },
  { q: 'كم تكلفة نشر إعلان؟', a: 'تبدأ الباقات من 15 جنيهاً لمدة 15 يوماً، و35 جنيهاً للإعلان المميز لمدة 30 يوماً، و75 جنيهاً لإعلان Featured، و150 جنيهاً لباقة Premium مع بانر في الصفحة الرئيسية.' },
  { q: 'هل الشراء من الموقع آمن؟', a: 'Vintage منصة إعلانية تربط البائع بالمشتري مباشرة. ننصح دائماً بمعاينة القطعة على الطبيعة قبل الدفع وتجنّب أي تحويل مالي مقدّم.' },
  { q: 'ما أنواع القطع المعروضة؟', a: 'أنتيك فرنسي وعثماني ومصري، تماثيل ومزهريات، لوحات وسيراميك ونجف وسجاد شرقي، ساعات كلاسيكية ومجوهرات عتيقة وفضيات، كتب نادرة ومخطوطات وعملات وطوابع، أثاث لويس، راديوهات وجراموفون وكاميرات قديمة، ومقتنيات نادرة متنوعة.' },
];

export default async function Home() {
  const { rows, demo } = await getAds({ limit: 12 });
  const featured = rows.filter((r) => r.package === 'premium' || r.package === 'featured').slice(0, 3);

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'أحدث التحف والمقتنيات المعروضة على Vintage',
    itemListElement: rows.slice(0, 12).map((a, i) => ({
      '@type': 'ListItem', position: i + 1, url: canonical(`/ad/${a.id}`), name: a.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section className="relative overflow-hidden border-b border-line">
        <div className="container-p relative py-14 text-center sm:py-20">
          <p className="eyebrow">EST. المنصة المصرية للتحف والمقتنيات</p>
          <h1 className="h1 mt-4">
            <span className="text-transparent bg-clip-text bg-goldfill">Vintage</span>
            <span className="block mt-2 text-2xl sm:text-3xl">سوق التحف والمقتنيات النادرة في مصر</span>
          </h1>
          <p className="prose-ar mx-auto mt-5 max-w-2xl text-muted">
            اعرض قطعتك أمام هواة جمع حقيقيين، أو ابحث عن الأنتيك الفرنسي والعثماني، الساعات الكلاسيكية، العملات والطوابع، الأثاث الملكي والسجاد الشرقي — كل إعلان مراجَع يدوياً قبل النشر.
          </p>
          <div className="mx-auto mt-8 max-w-xl"><SearchBox /></div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/add-ad" className="btn-gold">أضف إعلانك الآن</Link>
            <Link href="/how-it-works" className="btn-outline">كيف يعمل الموقع</Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
            {[['٨', 'أقسام متخصصة'], ['١٠', 'صور لكل إعلان'], ['١٥ ج', 'أقل سعر إعلان']].map(([n, t]) => (
              <div key={t}><div className="font-display text-2xl font-bold text-gold-light">{n}</div><div className="mt-1 text-xs text-muted">{t}</div></div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container-p py-12">
          <div className="mb-5 flex items-end justify-between">
            <div><p className="eyebrow">مختارات</p><h2 className="h2 mt-1">قطع مميزة هذا الأسبوع</h2></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">{featured.map((a) => <AdCard key={a.id} ad={a} priority />)}</div>
        </section>
      )}

      <section className="container-p py-6">
        <p className="eyebrow">تصفح حسب النوع</p>
        <h2 className="h2 mt-1 mb-5">أقسام Vintage</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="card-lux p-5 text-center transition hover:border-gold/45 hover:shadow-lux">
              <span className="text-3xl" aria-hidden>{c.icon}</span>
              <span className="mt-2.5 block text-sm font-semibold leading-snug">{c.name}</span>
              <span className="mt-1 block text-[11px] text-muted">{c.subs.slice(0, 2).join(' · ')}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-p py-12">
        <div className="mb-5 flex items-end justify-between">
          <div><p className="eyebrow">المعروض حالياً</p><h2 className="h2 mt-1">أحدث الإعلانات</h2></div>
          <Link href="/search" className="link-gold text-sm">عرض الكل ←</Link>
        </div>
        {rows.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{rows.map((a) => <AdCard key={a.id} ad={a} />)}</div>
        ) : (
          <p className="text-muted">لا توجد إعلانات منشورة بعد. كن أول من يعرض قطعته.</p>
        )}
        {demo && <p className="mt-4 text-xs text-muted">القطع المعروضة نماذج توضيحية لحين ربط قاعدة البيانات.</p>}
      </section>

      <section className="container-p py-12">
        <p className="eyebrow">أسئلة شائعة</p>
        <h2 className="h2 mb-5 mt-1">كل ما تحتاج معرفته عن Vintage</h2>
        <div className="grid gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card-lux group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="text-gold-light">؟</span> {f.q}
              </summary>
              <p className="prose-ar mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
