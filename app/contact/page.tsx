import { ADMIN_EMAIL, VODAFONE_CASH } from '@/lib/data';
export const metadata = { title: 'اتصل بنا | كراكيب وتحف' };
export default function Page() {
  return (
    <div className="container-p py-8">
      <h1 className="h1">اتصل بنا</h1>
      <div className="card p-5 mt-4 grid gap-3 text-sm">
        <div>📧 البريد: <a className="gold" href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a></div>
        <div>💬 واتساب / فودافون كاش: <a className="gold" href={`https://wa.me/2${VODAFONE_CASH}`}>{VODAFONE_CASH}</a></div>
        <div>🕐 الرد خلال 24 ساعة.</div>
      </div>
    </div>
  );
}
