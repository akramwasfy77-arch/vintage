'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import imageCompression from 'browser-image-compression';
import { supabase, supabaseReady } from '@/lib/supabase';
import { CATEGORIES, GOVERNORATES, PACKAGES, VODAFONE_CASH, egp, pkgById } from '@/lib/data';

const empty = { title: '', category: '', subcategory: '', description: '', price_egp: '', location: '', seller_phone: '', seller_whatsapp: '', package: 'basic', vodafone_transaction_id: '' };

export default function Page() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState<any>(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)).catch(() => {}); }, []);

  const subs = CATEGORIES.find((c) => c.slug === f.category)?.subs || [];
  const pkg = pkgById(f.package)!;

  async function onFiles(e: any) {
    const list: File[] = Array.from(e.target.files || []).slice(0, 10) as File[];
    const out: File[] = [];
    for (const file of list) {
      try { out.push(await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1600, useWebWorker: true })); }
      catch { out.push(file); }
    }
    setFiles(out);
    setPreviews(out.map((x) => URL.createObjectURL(x)));
  }

  async function submit() {
    if (!supabaseReady) { setMsg('النشر يعمل بعد ربط قاعدة البيانات.'); return; }
    if (!user) { window.location.href = '/login'; return; }
    setBusy(true); setMsg(null);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
        const { error } = await supabase.storage.from('ad-photos').upload(path, file, { contentType: file.type || 'image/jpeg', upsert: false });
        if (error) throw error;
        urls.push(supabase.storage.from('ad-photos').getPublicUrl(path).data.publicUrl);
      }
      const { error } = await supabase.from('ads').insert({
        user_id: user.id, title: f.title, description: f.description, category: f.category, subcategory: f.subcategory || null,
        price_egp: Number(f.price_egp), location: f.location, seller_phone: f.seller_phone, seller_whatsapp: f.seller_whatsapp || f.seller_phone,
        photos: urls, package: f.package, package_price_egp: pkg.price, vodafone_transaction_id: f.vodafone_transaction_id, status: 'pending',
      });
      if (error) throw error;
      setDone(true);
    } catch (e: any) { setMsg(e.message || 'حدث خطأ'); }
    setBusy(false);
  }

  if (done) return (
    <div className="container-p py-16 max-w-md text-center">
      <div className="text-5xl">✅</div>
      <h1 className="h1 mt-3">تم استلام إعلانك</h1>
      <p className="text-muted mt-2">هنراجع تحويل فودافون كاش وننشر الإعلان خلال ساعات. تقدر تتابع الحالة من "إعلاناتي".</p>
      <Link href="/my-ads" className="btn-primary mt-5">إعلاناتي</Link>
    </div>
  );

  const steps = ['البيانات', 'الصور', 'الباقة', 'الدفع'];

  return (
    <div className="container-p py-6 max-w-2xl">
      <h1 className="h1">أضف إعلان</h1>
      <div className="flex gap-2 my-4">
        {steps.map((s, i) => (
          <div key={s} className={`flex-1 text-center text-xs py-2 rounded-lg border ${step === i + 1 ? 'border-primary text-primary' : step > i + 1 ? 'border-line text-muted' : 'border-line text-muted/50'}`}>{i + 1}. {s}</div>
        ))}
      </div>

      {!user && supabaseReady && <p className="card p-3 text-sm text-muted mb-3">لازم تسجّل الدخول قبل النشر. <Link href="/login" className="gold">دخول</Link></p>}

      <div className="card p-5 grid gap-3">
        {step === 1 && (<>
          <div><label className="label">عنوان الإعلان</label><input className="input" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="مثال: مزهرية عثمانية نحاسية" /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="label">القسم</label>
              <select className="input" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value, subcategory: '' })}>
                <option value="">اختر القسم</option>{CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select></div>
            <div><label className="label">القسم الفرعي</label>
              <select className="input" value={f.subcategory} onChange={(e) => setF({ ...f, subcategory: e.target.value })}>
                <option value="">— اختياري —</option>{subs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select></div>
          </div>
          <div><label className="label">الوصف</label><textarea rows={5} className="input" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="اذكر الحالة، العمر التقريبي، المقاسات، وأي تفاصيل مهمة" /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="label">السعر بالجنيه</label><input inputMode="numeric" className="input" value={f.price_egp} onChange={(e) => setF({ ...f, price_egp: e.target.value })} /></div>
            <div><label className="label">المحافظة</label>
              <select className="input" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })}>
                <option value="">اختر</option>{GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="label">رقم الموبايل</label><input inputMode="tel" className="input" value={f.seller_phone} onChange={(e) => setF({ ...f, seller_phone: e.target.value })} /></div>
            <div><label className="label">رقم واتساب (اختياري)</label><input inputMode="tel" className="input" value={f.seller_whatsapp} onChange={(e) => setF({ ...f, seller_whatsapp: e.target.value })} /></div>
          </div>
        </>)}

        {step === 2 && (<>
          <label className="label">الصور (من 1 إلى 10 — يتم ضغطها تلقائياً)</label>
          <input type="file" accept="image/*" multiple onChange={onFiles} className="input" />
          <div className="grid grid-cols-4 gap-2">{previews.map((p, i) => <img key={i} src={p} alt="" className="aspect-square object-cover rounded-lg" />)}</div>
        </>)}

        {step === 3 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {PACKAGES.map((p) => (
              <button key={p.id} onClick={() => setF({ ...f, package: p.id })} className={`text-start card p-4 ${f.package === p.id ? 'ring-2 ring-primary' : ''}`}>
                <div className="font-bold">{p.name}</div>
                <div className="gold font-bold">{egp(p.price)}</div>
                <div className="text-xs text-muted">{p.days} يوم</div>
                <ul className="mt-2 text-xs text-muted grid gap-1">{p.perks.map((x) => <li key={x}>✓ {x}</li>)}</ul>
              </button>
            ))}
          </div>
        )}

        {step === 4 && (<>
          <div className="rounded-xl bg-primary/10 border border-primary/40 p-4 text-center">
            <div className="text-sm text-muted">المطلوب تحويله</div>
            <div className="text-2xl font-bold gold">{egp(pkg.price)}</div>
            <div className="mt-2 text-sm">حوّل {pkg.price} جنيه على فودافون كاش:</div>
            <div className="text-xl font-bold tracking-wider mt-1">{VODAFONE_CASH}</div>
          </div>
          <div><label className="label">رقم عملية التحويل</label><input className="input" value={f.vodafone_transaction_id} onChange={(e) => setF({ ...f, vodafone_transaction_id: e.target.value })} placeholder="مثال: 8123456789" /></div>
          <p className="text-xs text-muted">بعد الإرسال يبقى الإعلان "قيد المراجعة" لحد ما نتأكد من التحويل، وبعدها ينشر تلقائياً.</p>
        </>)}

        {msg && <p className="text-sm text-red-400">{msg}</p>}

        <div className="flex gap-2 pt-2">
          {step > 1 && <button className="btn-ghost flex-1" onClick={() => setStep(step - 1)}>السابق</button>}
          {step < 4
            ? <button className="btn-primary flex-1" onClick={() => setStep(step + 1)}>التالي</button>
            : <button disabled={busy || !f.vodafone_transaction_id} className="btn-primary flex-1" onClick={submit}>{busy ? 'جارٍ الإرسال…' : 'إرسال الإعلان'}</button>}
        </div>
      </div>
    </div>
  );
}
