import Link from 'next/link';
import { catName, egp } from '@/lib/data';

export default function AdCard({ ad, priority = false }: { ad: any; priority?: boolean }) {
  const photo = Array.isArray(ad.photos) && ad.photos.length ? ad.photos[0] : null;
  const hot = ad.package === 'premium' || ad.package === 'featured';
  return (
    <article className={`card-lux group transition hover:border-gold/45 hover:shadow-lux ${hot ? 'border-gold/35' : ''}`}>
      <Link href={`/ad/${ad.id}`} className="block">
        <div className="frame-gold relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-surface2">
          {photo ? (
            <img src={photo} alt={`${ad.title} — ${catName(ad.category)} للبيع في ${ad.location || 'مصر'}`} loading={priority ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          ) : (
            <span className="grid h-full w-full place-items-center text-4xl opacity-25" aria-hidden>❖</span>
          )}
          {hot && <span className="absolute start-3 top-3 rounded-full bg-goldfill px-2.5 py-1 text-[10px] font-bold tracking-wider text-black">مميّز</span>}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug">{ad.title}</h3>
          <p className="mt-1.5 font-display text-lg font-bold text-gold-light">{egp(ad.price_egp)}</p>
          <p className="mt-1 text-xs text-muted">
            {catName(ad.category)}{ad.location ? ` · ${ad.location}` : ''}
          </p>
        </div>
      </Link>
    </article>
  );
}
