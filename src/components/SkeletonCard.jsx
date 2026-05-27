export default function SkeletonCard() {
  return (
    <div className="glass-card p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="skeleton h-5 w-36 rounded-lg" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
      <div className="divider" />
      <div className="flex gap-4">
        <div className="skeleton h-4 w-24 rounded-lg" />
        <div className="skeleton h-4 w-20 rounded-lg" />
      </div>
      <div className="skeleton h-4 w-32 rounded-lg" />
      <div className="flex gap-2 mt-1">
        <div className="skeleton h-8 w-20 rounded-xl" />
        <div className="skeleton h-8 w-20 rounded-xl" />
        <div className="skeleton h-8 w-8 rounded-xl" />
      </div>
    </div>
  )
}
