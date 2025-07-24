export default function DashboardOverviewErrorContainer({message}: {message: string}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-red-300 bg-red-50 p-4 shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700">{message}</p>
            <p className="text-xs text-red-500">Please try again later.</p>
          </div>
          <div className="text-red-500 text-xl">⚠️</div>
        </div>
      ))}
    </div>
  )
}
