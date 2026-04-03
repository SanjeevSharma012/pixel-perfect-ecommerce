const SkeletonCard = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden">
    <div className="skeleton" style={{ height: 220, borderRadius: 0 }} />
    <div className="p-4 space-y-3">
      <div className="skeleton" style={{ height: 12, width: '55%' }} />
      <div className="skeleton" style={{ height: 18, width: '90%' }} />
      <div className="skeleton" style={{ height: 12, width: '40%' }} />
      <div className="skeleton" style={{ height: 42, borderRadius: 12 }} />
    </div>
  </div>
);

const PageSpinner = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div style={{ width: 44, height: 44, border: '3px solid #e8e6df', borderTopColor: '#0a0a0f', borderRadius: '50%' }} className="animate-spin" />
    <p className="text-muted-foreground text-sm">{text}</p>
  </div>
);

const LoadingDots = () => (
  <span className="flex items-center justify-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'inline-block', animation: `dotBounce 1.4s ease infinite ${i * 160}ms` }} />
    ))}
  </span>
);

const Spinner = ({ size = 18, color = 'white' }) => (
  <span style={{ display: 'inline-block', width: size, height: size, border: `2px solid ${color}40`, borderTopColor: color, borderRadius: '50%', flexShrink: 0 }} className="animate-spin" />
);

export { SkeletonCard, PageSpinner, LoadingDots, Spinner };
export default PageSpinner;
