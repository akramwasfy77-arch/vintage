'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase, supabaseReady } from '@/lib/supabase';

export default function Page() {
  const [f, setF] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    if (!supabaseReady) return setMsg('الدخول يعمل بعد ربط قاعدة البيانات.');
    setBusy(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword(f);
    setBusy(false);
    if (error) return setMsg(error.message);
    window.location.href = '/my-ads';
  }

  return (
    <div className="container-p py-10 max-w-md">
      <h1 className="h1">تسجيل الدخول</h1>
      <form onSubmit={submit} className="card p-5 mt-4 grid gap-3">
        <div><label className="label">البريد الإلكتروني</label><input required type="email" className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label">كلمة المرور</label><input required type="password" className="input" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
        <button disabled={busy} className="btn-gold">{busy ? '...' : 'دخول'}</button>
        {msg && <p className="text-sm text-red-400">{msg}</p>}
        <p className="text-sm text-muted">مستخدم جديد؟ <Link href="/signup" className="link-gold">أنشئ حساب</Link></p>
      </form>
    </div>
  );
}
