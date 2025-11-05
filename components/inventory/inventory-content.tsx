import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { InventoryTable } from "./inventory-table"

export async function InventoryContent() {
  const supabase = await getSupabaseServerClient()

  const { data: ingredients, error } = await supabase
    .from("ingredients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Erro ao buscar produtos:", error)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground">Gerencie seus produtos cadastrados</p>
        </div>
        <Button asChild>
          <Link href="/inventory/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo produto
          </Link>
        </Button>
      </div>

      <InventoryTable ingredients={ingredients || []} />
    </div>
  )
}
