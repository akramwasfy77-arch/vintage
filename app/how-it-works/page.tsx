import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'كيف يعمل موقع Vintage للبائع والمشتري',
  description: 'شرح خطوة بخطوة لطريقة بيع التحف والمقتنيات على Vintage: إنشاء الحساب، كتابة الإعلان، رفع الصور، اختيار الباقة، الدفع عبر فودافون كاش، والمراجعة قبل النشر — وطريقة الشراء والتواصل مع البائع.',
  alternates: { canonical: canonical('/how-it-works') },
};

const seller = [
  ['أنشئ حسابك', 'التسجيل بالبريد الإلكتروني ورقم الموبايل وكلمة مرور. الحساب مجاني تماماً ولا يُحاسب إلا على نشر الإعلانات.'],
  ['اكتب إعلان القطعة', 'العنوان، القسم والقسم الفرعي، وصف تفصيلي يذكر الحالة والعمر التقريبي والمقاسات، السعر بالجنيه المصري، والمحافظة.'],
  ['ارفع الصور', 'من صورة واحدة إلى عشر صور. يتم ضغط الصور تلقائياً في المتصفح للحفاظ على سرعة التصفح دون فقد الوضوح.'],
  ['اختر الباقة', 'أربع باقات تختلف في المدة ومستوى الظهور، من 15 إلى 150 جنيهاً.'],
  ['ادفع عبر فودافون كاش', `حوّل قيمة الباقة على الرقم ${SITE.phone} وأدخل رقم عملية التحويل.`],
  ['المراجعة والنشر', 'يراجع الفريق التحويل وبيانات الإعلان يدوياً. بعد الموافقة يُنشر الإعلان تلقائياً وتبدأ مدة الباقة.'],
];
const buyer = [
  ['تصفح بدون تسجيل', 'كل الإعلانات المنشورة متاحة للتصفح والبحث دون الحاجة إلى حساب.'],
  ['ابحث وفلتر', 'ابحث بالكلمة أو تصفح الأقسام، وفلتر بالمحافظة ونطاق السعر.'],
  ['افحص القطعة', 'اطّلع على كل الصور والوصف التفصيلي وتفاصيل الحالة والمقاسات.'],
  ['تواصل مباشرة', 'زر واتساب أو اتصال هاتفي يوصلك بالبائع فوراً. عاين القطعة قبل الدفع.'],
];

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'كيف يعمل', path: '/how-it-works' }];
  const howto = {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: 'كيف تبيع قطعة أنتيك على Vintage',
    description: 'خطوات نشر إعلان لبيع قطعة تحف أو أنتيك على منصة Vintage المصرية.',
    step: seller.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
  };
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">الدليل</p>
      <h1 className="h1 mt-2">كيف يعمل موقع Vintage</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">
        Vintage يربط بائعي التحف والمقتنيات النادرة في مصر بالمشترين والهواة مباشرة. البائع يدفع رسم نشر ثابت للإعلان فقط، ولا تؤخذ أي عمولة على قيمة البيع، والتفاوض والتسليم يتمّان بين الطرفين مباشرة.
      </p>

      <section className="mt-10">
        <h2 className="h2">للبائع: من الحساب إلى النشر</h2>
        <ol className="mt-4 grid gap-3">
          {seller.map(([t, d], i) => (
            <li key={t} className="card-lux flex gap-4 p-5">
              <span className="font-display text-2xl font-bold text-gold/70">{String(i + 1).padStart(2, '0')}</span>
              <div><h3 className="font-semibold">{t}</h3><p className="prose-ar mt-1 !text-[14px] text-muted">{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="h2">للمشتري: من البحث إلى التواصل</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {buyer.map(([t, d], i) => (
            <li key={t} className="card-lux flex gap-4 p-5">
              <span className="font-display text-2xl font-bold text-gold/70">{String(i + 1).padStart(2, '0')}</span>
              <div><h3 className="font-semibold">{t}</h3><p className="prose-ar mt-1 !text-[14px] text-muted">{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10 flex gap-3">
        <Link href="/add-ad" className="btn-gold">ابدأ بنشر إعلانك</Link>
        <Link href="/pricing" className="btn-outline">اطّلع على الأسعار</Link>
      </div>
    </div>
  );
}
