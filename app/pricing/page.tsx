import Link from 'next/link';
import type { Metadata } from 'next';
import { PACKAGES, egp } from '@/lib/data';
import { SITE, canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'أسعار وباقات نشر الإعلانات',
  description: 'باقات نشر الإعلانات على Vintage تبدأ من 15 جنيهاً لمدة 15 يوماً، والمميز 35 جنيهاً لمدة 30 يوماً، وFeatured 75 جنيهاً، وPremium 150 جنيهاً مع بانر في الصفحة الرئيسية. الدفع عبر فودافون كاش.',
  alternates: { canonical: canonical('/pricing') },
};

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الأسعار', path: '/pricing' }];
  const jsonld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'باقات نشر الإعلانات على Vintage',
    itemListElement: PACKAGES.map((p, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Service', name: p.name, description: `${p.perks.join('، ')} — مدة ${p.days} يوماً`, offers: { '@type': 'Offer', price: p.price, priceCurrency: 'EGP' } },
    })),
  };
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">التسعير</p>
      <h1 className="h1 mt-2">أسعار وباقات نشر الإعلانات</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">
        الدفع مرة واحدة لكل إعلان، بدون عمولة على البيع ولا رسوم خفية. اختر الباقة حسب المدة ومستوى الظهور الذي تريده لقطعتك، وحوّل قيمتها عبر فودافون كاش على الرقم {SITE.phone}.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((p) => (
          <article key={p.id} className={`card-lux flex flex-col p-6 ${p.badge ? 'border-gold/55 shadow-lux' : ''}`}>
            {p.badge && <span className="mb-3 inline-block w-fit rounded-full bg-goldfill px-2.5 py-1 text-[10px] font-bold text-black">{p.badge}</span>}
            <h2 className="text-base font-semibold">{p.name}</h2>
            <p className="mt-1 font-display text-3xl font-bold text-gold-light">{egp(p.price)}</p>
            <p className="mt-1 text-xs text-muted">مدة العرض {p.days} يوماً</p>
            <ul className="mt-4 grid flex-1 gap-2 text-sm text-muted">
              {p.perks.map((x) => <li key={x}><span className="text-gold-light">✦</span> {x}</li>)}
            </ul>
            <Link href="/add-ad" className="btn-gold mt-5">اختر هذه الباقة</Link>
          </article>
        ))}
      </div>
      <section className="card-lux mt-8 p-6">
        <h2 className="h2">طريقة الدفع</h2>
        <p className="prose-ar mt-3 text-muted">
          بعد ملء بيانات الإعلان واختيار الباقة، تظهر لك صفحة الدفع بقيمة الباقة ورقم محفظة فودافون كاش <strong className="text-gold-light">{SITE.phone}</strong>. حوّل المبلغ ثم أدخل رقم عملية التحويل في الخانة المخصصة. يراجع الفريق التحويل يدوياً وينشر الإعلان خلال ساعات، وتصلك حالة الإعلان في صفحة «إعلاناتي».
        </p>
      </section>
    </div>
  );
}
