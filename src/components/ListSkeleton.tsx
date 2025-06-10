export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className='space-y-2'>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className='h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'
        />
      ))}
    </div>
  );
}
