export default function PropertySkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-lg p-4 space-y-4 animate-pulse"
        >
          <div className="aspect-[4/3] w-full bg-[var(--bg-card-subtle)] rounded-2xl" />
          <div className="space-y-2">
            <div className="h-5 bg-[var(--bg-card-subtle)] rounded-md w-3/4" />
            <div className="h-3.5 bg-[var(--bg-card-subtle)] rounded-md w-1/2" />
          </div>
          <div className="h-10 bg-[var(--bg-card-subtle)] rounded-xl w-full" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 bg-[var(--bg-card-subtle)] rounded-md w-1/3" />
            <div className="h-8 bg-[var(--bg-card-subtle)] rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
