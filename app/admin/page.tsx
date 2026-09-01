'use client';
import { useEffect, useState } from 'react';
import { supabase, supabaseReady } from '@/lib/supabase';
import { ADMIN_EMAIL } from '@/lib/data';

export default function Page() {
  const [f, setF] = useState({ email: ADMIN_EMAIL, password: '' });
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabaseReady) return;
    supabase.auth.getUser().then(({ data }) => { if (data.user?.email === ADMIN_EMAIL) window.location.href = '/admin/dashboard'; });
  }, []);

  async function submit(e: any) {
    e.preventDefault();
    if (!supabaseReady) return setMsg('لوحة الإدارة تعمل بعد ربط قاعدة البيانات.');
    setBusy(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword(f);
    setBusy(false);
    if (error) return setMsg(error.message);
    window.location.href = '/admin/dashboard';
  }

  return (
    <div className="container-p py-14 max-w-sm">
      <h1 className="h1 text-center">دخول الإدارة</h1>
      <form onSubmit={submit} className="card p-5 mt-4 grid gap-3">
        <div><label className="label">البريد</label><input type="email" className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label">كلمة المرور</label><input type="password" className="input" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
        <button disabled={busy} className="btn-gold">{busy ? '...' : 'دخول'}</button>
        {msg && <p className="text-sm text-red-400">{msg}</p>}
      </form>
    </div>
  );
}
