"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Ingredient } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createCustomer, updateCustomer } from "@/app/actions/customers"
import { createIngredient } from "@/app/actions/ingredients"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "../ui/select"

interface InventoryFormProps {
  ingredient?: Ingredient
}

export function InventoryForm({ ingredient }: InventoryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      if (ingredient) {
        await updateCustomer(ingredient.id, formData)
        toast({
          title: "Produto atualizado",
          description: "As informações do produto foram atualizadas com sucesso.",
        })
      } else {
        await createIngredient(formData)
        toast({
          title: "Produto cadastrado",
          description: "O produto foi cadastrado com sucesso.",
        })
      }
      router.push("/inventory")
      router.refresh()
    } catch (error) {
      console.error("[v0] Erro ao salvar o produto:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o produto.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Informações do produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 md:w-[600px]">
            <Label htmlFor="name">
              Nome <span className="text-destructive">*</span>
            </Label>
            <Input id="name" name="name" defaultValue={ingredient?.name} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="current_stock">
                Quantidade atual
              </Label>
              <Input type="number" id="current_stock" name="current_stock" defaultValue={ingredient?.current_stock} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimum_stock">
                Quantidade mínima
              </Label>
              <Input type="number" id="minimum_stock" name="minimum_stock" defaultValue={ingredient?.minimum_stock} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Unidade de medida <span className="text-destructive">*</span>
            </Label>
            {/* <Input id="phone" name="phone" type="tel" defaultValue={ingredient?.unit} required /> */}
            <Select name="unit" defaultValue={ingredient?.unit || "Unidade"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unidade">Unidade</SelectItem>
                <SelectItem value="Kg">Kg</SelectItem>
                <SelectItem value="Litro">Litro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : ingredient ? "Atualizar produto" : "Cadastrar produto"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
