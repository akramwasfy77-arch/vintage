'use client';
import { useState } from 'react';

export default function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [i, setI] = useState(0);
  if (!photos.length) {
    return <div className="card-lux frame-gold grid aspect-[4/3] place-items-center text-6xl opacity-20" aria-hidden>❖</div>;
  }
  return (
    <div>
      <div className="card-lux frame-gold aspect-[4/3] overflow-hidden bg-surface2">
        <img src={photos[i]} alt={`${title} — صورة ${i + 1}`} className="h-full w-full object-contain" />
      </div>
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto scroll-x">
          {photos.map((p, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`عرض الصورة ${idx + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${idx === i ? 'border-gold' : 'border-line opacity-70'}`}>
              <img src={p} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
