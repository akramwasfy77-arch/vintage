import Link from 'next/link';
import Wordmark from './Wordmark';
import { CATEGORIES } from '@/lib/data';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface/50">
      <div className="container-p grid gap-8 py-12 text-sm sm:grid-cols-4">
        <div className="sm:col-span-2">
          <Wordmark />
          <p className="prose-ar mt-4 max-w-md !text-[14px] !leading-7 text-muted">
            Vintage سوق إلكتروني مصري متخصص في التحف والأنتيك والمقتنيات النادرة. كل إعلان يمر بمراجعة يدوية قبل النشر، والتواصل مباشر بين البائع والمشتري بدون وسيط.
          </p>
        </div>
        <nav aria-label="الأقسام" className="grid gap-2 text-muted">
          <span className="eyebrow mb-1">الأقسام</span>
          {CATEGORIES.slice(0, 5).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-gold-light">{c.name}</Link>
          ))}
        </nav>
        <nav aria-label="روابط المنصة" className="grid gap-2 text-muted">
          <span className="eyebrow mb-1">المنصة</span>
          <Link href="/how-it-works" className="hover:text-gold-light">كيف يعمل الموقع</Link>
          <Link href="/pricing" className="hover:text-gold-light">باقات الإعلانات</Link>
          <Link href="/blog" className="hover:text-gold-light">دليل المقتنيات</Link>
          <Link href="/contact" className="hover:text-gold-light">اتصل بنا</Link>
          <Link href="/terms" className="hover:text-gold-light">الشروط والأحكام</Link>
          <Link href="/privacy" className="hover:text-gold-light">سياسة الخصوصية</Link>
        </nav>
      </div>
      <div className="rule" />
      <div className="container-p flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-muted">
        <span>© {new Date().getFullYear()} {SITE.name} — جميع الحقوق محفوظة.</span>
        <span>فودافون كاش للإعلانات: {SITE.phone}</span>
      </div>
    </footer>
  );
}
