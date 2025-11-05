import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { InventoryContent } from "@/components/inventory/inventory-content"

export default function InventoryPage() {
  return (
    <Suspense fallback={<InventorySkeleton />}>
      <InventoryContent />
    </Suspense>
  )
}

function InventorySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}
