export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="شعار Vintage" className="shrink-0">
      <defs>
        <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7C766" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8C6D12" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#141419" stroke="url(#vg)" strokeWidth="1.5" />
      <rect x="7" y="7" width="50" height="50" rx="10" fill="none" stroke="url(#vg)" strokeWidth="0.6" opacity="0.5" />
      <path d="M20 20 L32 46 L44 20" fill="none" stroke="url(#vg)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="15.5" r="2.4" fill="url(#vg)" />
    </svg>
  );
}
