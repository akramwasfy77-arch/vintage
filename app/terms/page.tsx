import type { Metadata } from 'next';
import { canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'الشروط والأحكام',
  description: 'شروط استخدام منصة Vintage لبيع وشراء التحف والمقتنيات: مسؤولية المعلن، القطع الممنوع عرضها، سياسة الرسوم، وحقوق الإدارة في مراجعة الإعلانات.',
  alternates: { canonical: canonical('/terms') },
};

const items: [string, string][] = [
  ['طبيعة الخدمة', 'Vintage منصة إعلانية وسيطة تتيح عرض القطع والتواصل بين البائع والمشتري. المنصة لا تملك أي قطعة معروضة ولا تضمن أصالتها أو حالتها أو إتمام الصفقة.'],
  ['مسؤولية المعلن', 'المعلن مسؤول وحده عن صحة بيانات إعلانه وعن ملكيته القانونية للقطعة وحقه في بيعها، وعن مطابقة الصور للقطعة الفعلية.'],
  ['القطع الممنوعة', 'يُمنع عرض الآثار المسجّلة أو أي قطع يحظر القانون المصري تداولها أو تصديرها، وكذلك المقلّد المعروض على أنه أصلي.'],
  ['رسوم الإعلانات', 'رسوم نشر الإعلان مستحقة عن خدمة العرض ذاتها وغير مستردة بعد النشر. لا تتقاضى المنصة أي عمولة على قيمة البيع.'],
  ['المراجعة والرفض', 'يحق للإدارة رفض أو تعديل أو حذف أي إعلان مخالف أو مضلل أو غير مكتمل البيانات، مع بيان السبب للمعلن.'],
  ['إتمام الصفقة', 'التفاوض والمعاينة والدفع والتسليم تتم خارج المنصة وعلى مسؤولية الطرفين. ننصح بالمعاينة الشخصية قبل أي دفع وبتجنّب التحويلات المسبقة.'],
  ['تعديل الشروط', 'قد تُحدَّث هذه الشروط من وقت لآخر، ويسري التحديث من تاريخ نشره على هذه الصفحة.'],
];

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'الشروط والأحكام', path: '/terms' }];
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <Breadcrumbs items={crumbs} />
      <h1 className="h1">الشروط والأحكام</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">باستخدامك موقع Vintage سواء بالتصفح أو بنشر إعلان، فأنت توافق على الشروط التالية.</p>
      <div className="mt-6 grid gap-3">
        {items.map(([t, d], i) => (
          <section key={t} className="card-lux p-5">
            <h2 className="text-base font-semibold"><span className="text-gold/70">{i + 1}.</span> {t}</h2>
            <p className="prose-ar mt-2 !text-[14.5px] text-muted">{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
