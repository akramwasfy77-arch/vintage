'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, supabaseReady } from '@/lib/supabase';

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [f, setF] = useState({ full_name: '', phone: '' });
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setF({ full_name: data.user?.user_metadata?.full_name || '', phone: data.user?.user_metadata?.phone || '' });
    }).catch(() => {});
  }, []);

  async function save() {
    const { error } = await supabase.auth.updateUser({ data: f });
    if (!error) await supabase.from('users').update({ full_name: f.full_name, phone: f.phone }).eq('id', user.id);
    setMsg(error ? error.message : 'تم الحفظ');
  }

  if (!supabaseReady) return <div className="container-p py-10 text-muted">الحساب يعمل بعد ربط قاعدة البيانات.</div>;
  if (!user) return <div className="container-p py-10">لازم تسجّل الدخول. <Link href="/login" className="link-gold">دخول</Link></div>;

  return (
    <div className="container-p py-8 max-w-md">
      <h1 className="h1">حسابي</h1>
      <div className="card p-5 mt-4 grid gap-3">
        <div><label className="label">البريد</label><input disabled className="input opacity-60" value={user.email} /></div>
        <div><label className="label">الاسم</label><input className="input" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} /></div>
        <div><label className="label">الموبايل</label><input className="input" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
        <button className="btn-gold" onClick={save}>حفظ</button>
        {msg && <p className="text-sm text-muted">{msg}</p>}
        <button className="btn-ghost" onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }}>تسجيل الخروج</button>
      </div>
    </div>
  );
}
