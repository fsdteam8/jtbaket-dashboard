export default function DashboardCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border bg-white p-7 shadow-sm flex items-center justify-between"
        >
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  )
}