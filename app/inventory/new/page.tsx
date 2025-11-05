import { InventoryForm } from "@/components/inventory/inventory-form"

export default function NewIngredientPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Novo produto</h1>
        <p className="text-muted-foreground">Cadastre um novo produto no sistema</p>
      </div>
      <InventoryForm />
    </div>
  )
}
