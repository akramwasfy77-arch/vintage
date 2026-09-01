import Logo from './Logo';
export default function Wordmark({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Logo size={size} />
      <span className="leading-none">
        <span className="block font-display text-[19px] font-bold tracking-[.18em] text-transparent bg-clip-text bg-goldfill">VINTAGE</span>
        <span className="mt-0.5 block text-[10px] tracking-[.28em] text-muted">تحف ومقتنيات</span>
      </span>
    </span>
  );
}
