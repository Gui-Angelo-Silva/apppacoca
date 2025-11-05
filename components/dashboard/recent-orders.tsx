import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/types"
import Link from "next/link"

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  in_production: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  ready: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  delivered: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
}

const statusLabels = {
  pending: "Pendente",
  confirmed: "Confirmado",
  in_production: "Em Produção",
  ready: "Pronto",
  delivered: "Entregue",
  cancelled: "Cancelado",
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum pedido encontrado</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{order.order_number}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.order_date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total_amount)}
                  </p>
                  <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
