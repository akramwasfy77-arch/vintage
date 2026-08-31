import { VODAFONE_CASH } from '@/lib/data';
export const metadata = { title: 'كيف يعمل الموقع | كراكيب وتحف' };
const seller = ['سجّل حساب بالإيميل ورقم الموبايل', 'اضغط "أضف إعلان" واملأ البيانات وارفع من 1 إلى 10 صور', 'اختر الباقة المناسبة', `حوّل قيمة الباقة على فودافون كاش ${VODAFONE_CASH} وأدخل رقم العملية`, 'ننشر الإعلان بعد مراجعة التحويل'];
const buyer = ['تصفّح بدون تسجيل', 'ابحث أو فلتر بالقسم والسعر والمحافظة', 'افتح الإعلان وتواصل مع البائع واتساب أو اتصال'];
export default function Page() {
  return (
    <div className="container-p py-8 grid gap-6 sm:grid-cols-2">
      <div className="card p-5">
        <h2 className="font-bold mb-3">للبائع</h2>
        <ol className="grid gap-3 text-sm text-muted">{seller.map((s, i) => <li key={i} className="flex gap-3"><span className="gold font-bold">{i + 1}</span>{s}</li>)}</ol>
      </div>
      <div className="card p-5">
        <h2 className="font-bold mb-3">للمشتري</h2>
        <ol className="grid gap-3 text-sm text-muted">{buyer.map((s, i) => <li key={i} className="flex gap-3"><span className="gold font-bold">{i + 1}</span>{s}</li>)}</ol>
      </div>
    </div>
  );
}
