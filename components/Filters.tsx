import { CATEGORIES, GOVERNORATES } from '@/lib/data';

export default function Filters({ action, sp, lockCategory }: { action: string; sp: any; lockCategory?: boolean }) {
  return (
    <form action={action} method="get" className="card-lux grid gap-3 p-4 sm:grid-cols-5">
      <div className="sm:col-span-2">
        <label htmlFor="fq" className="label">كلمة البحث</label>
        <input id="fq" name="q" defaultValue={sp.q || ''} className="input" placeholder="اسم القطعة" />
      </div>
      {!lockCategory && (
        <div>
          <label htmlFor="fc" className="label">القسم</label>
          <select id="fc" name="c" defaultValue={sp.c || ''} className="input">
            <option value="">كل الأقسام</option>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="fl" className="label">المحافظة</label>
        <select id="fl" name="loc" defaultValue={sp.loc || ''} className="input">
          <option value="">كل المحافظات</option>
          {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div>
        <label className="label">السعر (جنيه)</label>
        <div className="flex gap-2">
          <input name="min" defaultValue={sp.min || ''} inputMode="numeric" className="input" placeholder="من" aria-label="أقل سعر" />
          <input name="max" defaultValue={sp.max || ''} inputMode="numeric" className="input" placeholder="إلى" aria-label="أعلى سعر" />
        </div>
      </div>
      <div className="sm:col-span-5"><button className="btn-gold w-full sm:w-auto">تطبيق الفلاتر</button></div>
    </form>
  );
}
