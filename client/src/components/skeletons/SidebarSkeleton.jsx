

export default function SidebarSkeleton() {
  return (
    <div className="flex justify-between items-center w-full p-1">
        <div className="rounded-full skeleton h-8 w-8"></div>
        <div className="flex flex-col items-center gap-2">
            <div className="rounded-full skeleton h-6 w-10"></div>
            <div className="rounded-full skeleton h-6 w-10"></div>
        </div>
    </div>
  )
}
