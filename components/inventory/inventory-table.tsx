"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Mail, Phone } from "lucide-react"
import type { Ingredient } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"
// import { DeleteCustomerDialog } from "./delete-customer-dialog"

interface InventoryTableProps {
  ingredients: Ingredient[]
}

export function InventoryTable({ ingredients }: InventoryTableProps) {
  const [deleteIngredient, setDeleteIngredient] = useState<Ingredient | null>(null)

  if (ingredients.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Nenhum item cadastrado</p>
          <Button asChild className="mt-4 bg-transparent" variant="outline">
            <Link href="/customers/new">Cadastrar primeiro item</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Quantidade atual</TableHead>
              <TableHead>Quantidade mínima</TableHead>
              {/* <TableHead>Preço unitário</TableHead> */}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell className="font-medium">{ingredient.unit}</TableCell>
                <TableCell className="font-medium">{ingredient.current_stock}</TableCell>
                <TableCell className="font-medium">{ingredient.minimum_stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/inventory/${ingredient.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteIngredient(ingredient)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <DeleteCustomerDialog customer={deleteCustomer} onClose={() => setDeleteCustomer(null)} /> */}
    </>
  )
}
