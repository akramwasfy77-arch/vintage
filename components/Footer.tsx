import Link from 'next/link';
import { VODAFONE_CASH } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60 mt-10">
      <div className="container-p py-8 text-sm text-muted grid gap-6 sm:grid-cols-3">
        <div>
          <div className="font-bold text-ink mb-2">🏺 كراكيب وتحف</div>
          <p className="leading-relaxed">المنصة الأولى في مصر لبيع التحف والمقتنيات النادرة.</p>
        </div>
        <div className="grid gap-2">
          <Link href="/how-it-works" className="hover:text-ink">كيف يعمل الموقع</Link>
          <Link href="/pricing" className="hover:text-ink">باقات الإعلانات</Link>
          <Link href="/contact" className="hover:text-ink">اتصل بنا</Link>
        </div>
        <div className="grid gap-2">
          <Link href="/terms" className="hover:text-ink">الشروط والأحكام</Link>
          <Link href="/privacy" className="hover:text-ink">سياسة الخصوصية</Link>
          <span>فودافون كاش: {VODAFONE_CASH}</span>
        </div>
      </div>
      <div className="container-p pb-6 text-xs text-muted/70">© {new Date().getFullYear()} كراكيب وتحف — جميع الحقوق محفوظة.</div>
    </footer>
  );
}
