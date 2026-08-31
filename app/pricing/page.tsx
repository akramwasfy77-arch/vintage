import Link from 'next/link';
import { PACKAGES, VODAFONE_CASH, egp } from '@/lib/data';
export const metadata = { title: 'باقات الإعلانات | كراكيب وتحف' };
export default function Page() {
  return (
    <div className="container-p py-8">
      <h1 className="h1">باقات الإعلانات</h1>
      <p className="text-muted mt-2">ادفع مرة واحدة، وإعلانك يفضل شغال طول مدة الباقة.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((p) => (
          <div key={p.id} className={`card p-5 ${p.badge ? 'ring-1 ring-primary' : ''}`}>
            {p.badge && <span className="chip !bg-primary !text-black !border-primary mb-2">{p.badge}</span>}
            <div className="font-bold">{p.name}</div>
            <div className="text-2xl font-bold gold mt-1">{egp(p.price)}</div>
            <div className="text-xs text-muted">مدة {p.days} يوم</div>
            <ul className="mt-3 text-sm grid gap-1.5 text-muted">{p.perks.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <Link href="/add-ad" className="btn-primary w-full mt-4">اختر الباقة</Link>
          </div>
        ))}
      </div>
      <div className="card p-5 mt-6">
        <div className="font-bold mb-1">طريقة الدفع</div>
        <p className="text-sm text-muted">تحويل فودافون كاش على الرقم <span className="gold font-bold">{VODAFONE_CASH}</span> ثم إدخال رقم عملية التحويل في صفحة الدفع. يتم مراجعة التحويل ونشر الإعلان خلال ساعات.</p>
      </div>
    </div>
  );
}
