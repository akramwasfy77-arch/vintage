'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CATEGORIES } from '@/lib/data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null)).catch(() => {});
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-line">
      <div className="container-p flex items-center gap-3 h-16">
        <button aria-label="القائمة" className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>☰</button>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🏺</span>
          <span>كراكيب <span className="gold">وتحف</span></span>
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm text-muted mr-4">
          <Link href="/search" className="hover:text-ink">تصفح الإعلانات</Link>
          <Link href="/pricing" className="hover:text-ink">الأسعار</Link>
          <Link href="/how-it-works" className="hover:text-ink">كيف يعمل</Link>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <Link href="/add-ad" className="btn-primary !px-3 !py-2 text-xs sm:text-sm">أضف إعلان</Link>
          <Link href={email ? '/my-ads' : '/login'} className="btn-ghost !px-3 !py-2 text-xs sm:text-sm">
            {email ? 'حسابي' : 'دخول'}
          </Link>
        </div>
      </div>
      {open && (
        <div className="sm:hidden border-t border-line bg-surface">
          <div className="container-p py-3 grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category?c=${c.slug}`} onClick={() => setOpen(false)} className="chip justify-start">
                <span>{c.icon}</span> {c.name}
              </Link>
            ))}
            <Link href="/pricing" onClick={() => setOpen(false)} className="chip justify-start">💰 الأسعار</Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="chip justify-start">❓ كيف يعمل</Link>
          </div>
        </div>
      )}
    </header>
  );
}
