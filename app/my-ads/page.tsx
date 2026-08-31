'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, supabaseReady } from '@/lib/supabase';
import { egp, pkgById } from '@/lib/data';
import StatusBadge from '@/components/StatusBadge';

export default function Page() {
  const [rows, setRows] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!supabaseReady) return setLoading(false);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (!data.user) return setLoading(false);
      const { data: ads } = await supabase.from('ads').select('*').eq('user_id', data.user.id).order('created_at', { ascending: false });
      setRows(ads || []); setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container-p py-10 text-muted">جارٍ التحميل…</div>;
  if (!user) return <div className="container-p py-10">لازم تسجّل الدخول. <Link href="/login" className="gold">دخول</Link></div>;

  return (
    <div className="container-p py-6">
      <div className="flex items-center justify-between">
        <h1 className="h1">إعلاناتي</h1>
        <div className="flex gap-2">
          <Link href="/profile" className="btn-ghost !py-2 !px-3 text-sm">حسابي</Link>
          <Link href="/add-ad" className="btn-primary !py-2 !px-3 text-sm">إعلان جديد</Link>
        </div>
      </div>
      <div className="grid gap-3 mt-4">
        {rows.length ? rows.map((a) => (
          <div key={a.id} className="card p-4 flex gap-3 items-center">
            <div className="h-16 w-16 rounded-lg bg-surface2 overflow-hidden grid place-items-center shrink-0">
              {a.photos?.[0] ? <img src={a.photos[0]} alt="" className="h-full w-full object-cover" /> : <span className="opacity-40">🏺</span>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{a.title}</div>
              <div className="text-sm gold">{egp(a.price_egp)}</div>
              <div className="text-xs text-muted mt-1">{pkgById(a.package)?.name} · عملية {a.vodafone_transaction_id}</div>
              {a.rejection_reason && <div className="text-xs text-red-400 mt-1">سبب الرفض: {a.rejection_reason}</div>}
            </div>
            <StatusBadge status={a.status} />
          </div>
        )) : <p className="text-muted">لا توجد إعلانات بعد.</p>}
      </div>
    </div>
  );
}
