'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountLink() {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSigned(!!data.user)).catch(() => {});
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSigned(!!s?.user));
    return () => sub.subscription.unsubscribe();
  }, []);
  return <Link href={signed ? '/my-ads' : '/login'} className="btn-ghost !px-4 !py-2.5 text-xs sm:text-sm">{signed ? 'حسابي' : 'دخول'}</Link>;
}
