export default function SearchBox({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form action="/search" method="get" role="search" className="flex gap-2">
      <label htmlFor="q" className="sr-only">ابحث في التحف والمقتنيات</label>
      <input id="q" name="q" defaultValue={defaultValue} className="input" placeholder="ابحث عن مزهرية، ساعة، عملة، سجادة…" />
      <button type="submit" className="btn-gold">بحث</button>
    </form>
  );
}
