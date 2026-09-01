import Link from 'next/link';
import Wordmark from './Wordmark';
import { CATEGORIES } from '@/lib/data';
import AccountLink from './AccountLink';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-p flex h-[68px] items-center gap-4">
        <Link href="/" aria-label="Vintage — الصفحة الرئيسية"><Wordmark /></Link>
        <nav aria-label="التنقل الرئيسي" className="mr-3 hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/search" className="transition hover:text-gold-light">تصفح التحف</Link>
          <Link href="/pricing" className="transition hover:text-gold-light">باقات الإعلانات</Link>
          <Link href="/how-it-works" className="transition hover:text-gold-light">كيف يعمل</Link>
          <Link href="/blog" className="transition hover:text-gold-light">دليل المقتنيات</Link>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <Link href="/add-ad" className="btn-gold !px-4 !py-2.5 text-xs sm:text-sm">أضف إعلانك</Link>
          <AccountLink />
        </div>
      </div>
      <nav aria-label="الأقسام" className="border-t border-line/70 bg-surface/40">
        <div className="container-p flex gap-2 overflow-x-auto py-2 scroll-x">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="chip whitespace-nowrap transition hover:border-gold/50">
              <span aria-hidden>{c.icon}</span> {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
