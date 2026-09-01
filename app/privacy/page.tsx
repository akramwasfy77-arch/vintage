import type { Metadata } from 'next';
import { canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'كيف يجمع Vintage بياناتك ويستخدمها: بيانات الحساب، رقم الموبايل الظاهر في الإعلان، رقم عملية فودافون كاش، وحقك في حذف حسابك.',
  alternates: { canonical: canonical('/privacy') },
};

const items: [string, string][] = [
  ['البيانات التي نجمعها', 'الاسم والبريد الإلكتروني ورقم الموبايل عند إنشاء الحساب، وبيانات الإعلان وصوره، ورقم عملية التحويل عند الدفع.'],
  ['استخدام رقم الموبايل', 'رقم موبايل المعلن يظهر للمشترين في صفحة الإعلان لتمكين التواصل المباشر — وهذا جوهر الخدمة ويتم بموافقتك عند النشر.'],
  ['بيانات الدفع', 'لا نخزّن أي بيانات محفظة أو بطاقة. رقم عملية فودافون كاش يُستخدم للتحقق اليدوي من التحويل فقط ولا يُعرض للزوار.'],
  ['الأمان', 'البيانات محفوظة في قاعدة بيانات محمية بسياسات وصول على مستوى الصف (RLS)، بحيث لا يرى المستخدم إلا بياناته وإعلاناته، والإعلانات المنشورة فقط تظهر للعامة.'],
  ['المشاركة مع الغير', 'لا نبيع بياناتك ولا نشاركها مع أطراف ثالثة لأغراض تسويقية.'],
  ['حقوقك', 'يمكنك تعديل بياناتك من صفحة الحساب، أو طلب حذف حسابك وكل إعلاناتك بالتواصل معنا عبر صفحة اتصل بنا.'],
];

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'سياسة الخصوصية', path: '/privacy' }];
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <Breadcrumbs items={crumbs} />
      <h1 className="h1">سياسة الخصوصية</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">نوضح هنا ما نجمعه من بيانات وكيف نستخدمه وحقوقك تجاهه.</p>
      <div className="mt-6 grid gap-3">
        {items.map(([t, d]) => (
          <section key={t} className="card-lux p-5">
            <h2 className="text-base font-semibold">{t}</h2>
            <p className="prose-ar mt-2 !text-[14.5px] text-muted">{d}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
