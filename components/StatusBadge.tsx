const MAP: Record<string, { t: string; c: string }> = {
  pending: { t: 'قيد المراجعة', c: 'text-amber-400 border-amber-400/40' },
  approved: { t: 'منشور', c: 'text-emerald-400 border-emerald-400/40' },
  rejected: { t: 'مرفوض', c: 'text-red-400 border-red-400/40' },
  expired: { t: 'منتهي', c: 'text-muted border-line' },
};
export default function StatusBadge({ status }: { status: string }) {
  const s = MAP[status] || MAP.pending;
  return <span className={`chip !bg-transparent ${s.c}`}>{s.t}</span>;
}
