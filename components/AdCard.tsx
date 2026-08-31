import Link from 'next/link';
import { catName, egp } from '@/lib/data';

export default function AdCard({ ad }: { ad: any }) {
  const photo = Array.isArray(ad.photos) && ad.photos.length ? ad.photos[0] : null;
  const hot = ad.package === 'premium' || ad.package === 'featured';
  return (
    <Link href={`/ad?id=${ad.id}`} className={`card overflow-hidden block transition hover:border-primary ${ad.package === 'special' || hot ? 'ring-1 ring-primary/40' : ''}`}>
      <div className="aspect-[4/3] bg-surface2 relative">
        {photo ? (
          <img src={photo} alt={ad.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-4xl opacity-40">🏺</div>
        )}
        {hot && <span className="absolute top-2 start-2 chip !bg-primary !text-black !border-primary font-bold">مميّز</span>}
      </div>
      <div className="p-3">
        <div className="text-[15px] font-semibold line-clamp-2 leading-snug">{ad.title}</div>
        <div className="mt-1 gold font-bold">{egp(ad.price_egp)}</div>
        <div className="mt-1 text-xs text-muted flex gap-2">
          <span>{catName(ad.category)}</span>
          {ad.location && <span>· {ad.location}</span>}
        </div>
      </div>
    </Link>
  );
}
