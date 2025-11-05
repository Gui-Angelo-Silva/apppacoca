"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createIngredient(formData: FormData) {
    const supabase = await getSupabaseServerClient()

    const ingredientData = {
        name: formData.get("name") as string,
        unit: formData.get("unit") as string,
        current_stock: parseFloat(formData.get("current_stock") as string) || 0,
        minimum_stock: parseFloat(formData.get("minimum_stock") as string) || 0,
        unit_cost: parseFloat(formData.get("unit_cost") as string) || 0,
        supplier: formData.get("supplier") as string,
    }

    const { error } = await supabase.from("ingredients").insert(ingredientData)

    if (error) {
        console.error("[v0] Erro ao cadastrar produto:", error)
        throw new Error("Falha ao cadastrar produto")
    }

    revalidatePath("/inventory")
}