"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCustomer(formData: FormData) {
  const supabase = await getSupabaseServerClient()

  const customerData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    cpf_cnpj: formData.get("cpf_cnpj") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip_code: formData.get("zip_code") as string,
    notes: formData.get("notes") as string,
  }

  const { error } = await supabase.from("customers").insert(customerData)

  if (error) {
    console.error("[v0] Error creating customer:", error)
    throw new Error("Failed to create customer")
  }

  revalidatePath("/customers")
}

export async function updateCustomer(id: string, formData: FormData) {
  const supabase = await getSupabaseServerClient()

  const customerData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    cpf_cnpj: formData.get("cpf_cnpj") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip_code: formData.get("zip_code") as string,
    notes: formData.get("notes") as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("customers").update(customerData).eq("id", id)

  if (error) {
    console.error("[v0] Error updating customer:", error)
    throw new Error("Failed to update customer")
  }

  revalidatePath("/customers")
  revalidatePath(`/customers/${id}/edit`)
}

export async function deleteCustomer(id: string) {
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.from("customers").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting customer:", error)
    throw new Error("Failed to delete customer")
  }

  revalidatePath("/customers")
}
