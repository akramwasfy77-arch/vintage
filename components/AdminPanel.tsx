'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, supabaseReady } from '@/lib/supabase';
import { ADMIN_EMAIL, egp, pkgById, catName } from '@/lib/data';
import StatusBadge from './StatusBadge';

const TABS = [
  { id: 'dashboard', name: 'لوحة التحكم', href: '/admin/dashboard' },
  { id: 'pending', name: 'إعلانات معلّقة', href: '/admin/pending' },
  { id: 'ads', name: 'كل الإعلانات', href: '/admin/ads' },
  { id: 'users', name: 'المستخدمون', href: '/admin/users' },
  { id: 'payments', name: 'المدفوعات', href: '/admin/payments' },
  { id: 'revenue', name: 'الإيرادات', href: '/admin/revenue' },
];

export default function AdminPanel({ tab }: { tab: string }) {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>(null);

  async function load() {
    const { data: a } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
    setAds(a || []);
    const { data: u } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    setUsers(u || []);
  }

  useEffect(() => {
    (async () => {
      if (!supabaseReady) { setReady(true); return; }
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user?.email === ADMIN_EMAIL) await load();
      setReady(true);
    })();
  }, []);

  async function decide(id: string, ok: boolean) {
    let reason = '';
    if (!ok) { reason = window.prompt('سبب الرفض؟') || ''; if (!reason) return; }
    const ad = ads.find((x) => x.id === id);
    const days = pkgById(ad.package)?.days || 15;
    const expires = new Date(Date.now() + days * 864e5).toISOString();
    const patch = ok
      ? { status: 'approved', approved_at: new Date().toISOString(), approved_by: user.id, expires_at: expires, rejection_reason: null }
      : { status: 'rejected', rejection_reason: reason };
    const { error } = await supabase.from('ads').update(patch).eq('id', id);
    setNote(error ? error.message : ok ? 'تم نشر الإعلان' : 'تم الرفض');
    load();
  }

  if (!ready) return <div className="container-p py-10 text-muted">جارٍ التحميل…</div>;
  if (!supabaseReady) return <div className="container-p py-10 text-muted">لوحة الإدارة تعمل بعد ربط قاعدة البيانات.</div>;
  if (!user) return <div className="container-p py-10">سجّل الدخول أولاً. <Link href="/admin" className="gold">دخول الإدارة</Link></div>;
  if (user.email !== ADMIN_EMAIL) return <div className="container-p py-10 text-red-400">هذا الحساب ليس لديه صلاحية إدارة.</div>;

  const pending = ads.filter((a) => a.status === 'pending');
  const approved = ads.filter((a) => a.status === 'approved');
  const revenue = approved.reduce((s, a) => s + Number(a.package_price_egp || 0), 0);
  const pendingRevenue = pending.reduce((s, a) => s + Number(a.package_price_egp || 0), 0);

  const Row = ({ a, actions }: any) => (
    <div className="card p-4 grid gap-2">
      <div className="flex gap-3 items-start">
        <div className="h-16 w-16 rounded-lg bg-surface2 overflow-hidden grid place-items-center shrink-0">
          {a.photos?.[0] ? <img src={a.photos[0]} alt="" className="h-full w-full object-cover" /> : <span className="opacity-40">🏺</span>}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold">{a.title}</div>
          <div className="text-sm gold">{egp(a.price_egp)} · {catName(a.category)}</div>
          <div className="text-xs text-muted mt-1">{pkgById(a.package)?.name} ({egp(a.package_price_egp)}) · فودافون كاش: <span className="text-ink font-mono">{a.vodafone_transaction_id}</span></div>
          <div className="text-xs text-muted">{a.seller_phone} · {a.location}</div>
        </div>
        <StatusBadge status={a.status} />
      </div>
      {actions && (
        <div className="flex gap-2">
          <button className="btn-primary flex-1 !py-2 text-sm" onClick={() => decide(a.id, true)}>موافقة</button>
          <button className="btn-ghost flex-1 !py-2 text-sm" onClick={() => decide(a.id, false)}>رفض</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-p py-6">
      <div className="flex items-center justify-between">
        <h1 className="h1">الإدارة</h1>
        <button className="btn-ghost !py-2 !px-3 text-sm" onClick={async () => { await supabase.auth.signOut(); window.location.href = '/admin'; }}>خروج</button>
      </div>
      <div className="flex gap-2 overflow-x-auto scroll-x my-4">
        {TABS.map((t) => <Link key={t.id} href={t.href} className={`chip whitespace-nowrap ${tab === t.id ? '!border-primary text-primary' : ''}`}>{t.name}</Link>)}
      </div>
      {note && <p className="text-sm gold mb-3">{note}</p>}

      {tab === 'dashboard' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['إعلانات معلّقة', pending.length], ['إعلانات منشورة', approved.length], ['المستخدمون', users.length], ['الإيرادات المحصّلة', egp(revenue)]].map(([k, v]) => (
            <div key={k as string} className="card p-4"><div className="text-xs text-muted">{k}</div><div className="text-2xl font-bold gold mt-1">{v as any}</div></div>
          ))}
        </div>
      )}

      {tab === 'pending' && <div className="grid gap-3">{pending.length ? pending.map((a) => <Row key={a.id} a={a} actions />) : <p className="text-muted">لا توجد إعلانات معلّقة.</p>}</div>}
      {tab === 'ads' && <div className="grid gap-3">{ads.map((a) => <Row key={a.id} a={a} actions={a.status === 'pending'} />)}</div>}

      {tab === 'users' && (
        <div className="grid gap-2">
          {users.map((u) => (
            <div key={u.id} className="card p-3 text-sm flex justify-between">
              <div><div className="font-semibold">{u.full_name || '—'}</div><div className="text-muted text-xs">{u.email} · {u.phone}</div></div>
              <span className="chip">{u.role}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'payments' && (
        <div className="grid gap-2">
          {ads.map((a) => (
            <div key={a.id} className="card p-3 text-sm flex justify-between items-center gap-3">
              <div className="min-w-0"><div className="truncate">{a.title}</div><div className="text-xs text-muted font-mono">{a.vodafone_transaction_id}</div></div>
              <div className="text-end shrink-0"><div className="gold font-bold">{egp(a.package_price_egp)}</div><StatusBadge status={a.status} /></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'revenue' && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="card p-4"><div className="text-xs text-muted">محصّل (معتمد)</div><div className="text-2xl font-bold gold">{egp(revenue)}</div></div>
          <div className="card p-4"><div className="text-xs text-muted">قيد التحقق</div><div className="text-2xl font-bold">{egp(pendingRevenue)}</div></div>
          <div className="card p-4"><div className="text-xs text-muted">متوسط قيمة الإعلان</div><div className="text-2xl font-bold">{egp(approved.length ? revenue / approved.length : 0)}</div></div>
        </div>
      )}
    </div>
  );
}
