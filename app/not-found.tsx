import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container-p py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h1 mt-3">الصفحة غير موجودة</h1>
      <p className="prose-ar mx-auto mt-4 max-w-md text-muted">ربما حُذف الإعلان أو انتهت مدة عرضه. جرّب تصفح الأقسام أو البحث عن قطعة مشابهة.</p>
      <div className="mt-7 flex justify-center gap-3">
        <Link href="/" className="btn-gold">الصفحة الرئيسية</Link>
        <Link href="/search" className="btn-outline">تصفح الإعلانات</Link>
      </div>
    </div>
  );
}
