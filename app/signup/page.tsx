'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase, supabaseReady } from '@/lib/supabase';

export default function Page() {
  const [f, setF] = useState({ full_name: '', email: '', phone: '', password: '' });
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    if (!supabaseReady) return setMsg('التسجيل يعمل بعد ربط قاعدة البيانات.');
    setBusy(true); setMsg(null);
    const { error } = await supabase.auth.signUp({
      email: f.email, password: f.password,
      options: { data: { full_name: f.full_name, phone: f.phone } },
    });
    setBusy(false);
    setMsg(error ? error.message : 'تم إنشاء الحساب. راجع بريدك للتفعيل ثم سجّل الدخول.');
    if (!error) setTimeout(() => (window.location.href = '/login'), 1500);
  }

  return (
    <div className="container-p py-10 max-w-md">
      <h1 className="h1">إنشاء حساب</h1>
      <form onSubmit={submit} className="card p-5 mt-4 grid gap-3">
        <div><label className="label">الاسم بالكامل</label><input required className="input" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} /></div>
        <div><label className="label">البريد الإلكتروني</label><input required type="email" className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label">رقم الموبايل</label><input required inputMode="tel" className="input" placeholder="01xxxxxxxxx" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
        <div><label className="label">كلمة المرور</label><input required type="password" minLength={6} className="input" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
        <button disabled={busy} className="btn-gold">{busy ? '...' : 'إنشاء الحساب'}</button>
        {msg && <p className="text-sm text-muted">{msg}</p>}
        <p className="text-sm text-muted">عندك حساب؟ <Link href="/login" className="link-gold">سجّل الدخول</Link></p>
      </form>
    </div>
  );
}
