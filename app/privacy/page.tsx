export const metadata = { title: 'سياسة الخصوصية | كراكيب وتحف' };
const items = ['نجمع الاسم والبريد ورقم الموبايل لإنشاء الحساب ونشر الإعلانات فقط.', 'رقم موبايل المعلن يظهر للمشترين للتواصل — وهذا جوهر الخدمة.', 'رقم عملية فودافون كاش يُستخدم للتحقق من الدفع فقط ولا يُنشر.', 'لا نبيع بياناتك لأي طرف ثالث.', 'يمكنك طلب حذف حسابك وبياناتك عبر صفحة اتصل بنا.'];
export default function Page() {
  return <div className="container-p py-8"><h1 className="h1">سياسة الخصوصية</h1><ul className="card p-5 mt-4 grid gap-3 text-sm text-muted">{items.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>;
}
