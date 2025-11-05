"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Customer } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteCustomer } from "@/app/actions/customers"
import { useToast } from "@/hooks/use-toast"

interface DeleteCustomerDialogProps {
  customer: Customer | null
  onClose: () => void
}

export function DeleteCustomerDialog({ customer, onClose }: DeleteCustomerDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!customer) return

    setIsDeleting(true)
    try {
      await deleteCustomer(customer.id)
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
      })
      onClose()
      router.refresh()
    } catch (error) {
      console.error("[v0] Error deleting customer:", error)
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o cliente.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={!!customer} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o cliente <strong>{customer?.name}</strong>? Esta ação não pode ser desfeita
            e todos os pedidos associados também serão excluídos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
