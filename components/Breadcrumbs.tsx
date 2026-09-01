import Link from 'next/link';
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="مسار التنقل" className="mb-4 text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i < items.length - 1 ? <Link href={it.path} className="hover:text-gold-light">{it.name}</Link> : <span className="text-ink/80">{it.name}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
