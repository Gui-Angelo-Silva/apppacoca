import { getSupabaseServerClient } from "@/lib/supabase/server"
import { CustomerForm } from "@/components/customers/customer-form"
import { notFound } from "next/navigation"

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const { data: customer, error } = await supabase.from("customers").select("*").eq("id", id).single()

  if (error || !customer) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
        <p className="text-muted-foreground">Atualize as informações do cliente</p>
      </div>
      <CustomerForm customer={customer} />
    </div>
  )
}
