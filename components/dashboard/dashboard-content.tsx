import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, TrendingUp, AlertTriangle, ShoppingCart, Factory } from "lucide-react"
import { RecentOrders } from "./recent-orders"
import { StockAlerts } from "./stock-alerts"

export async function DashboardContent() {
  const supabase = await getSupabaseServerClient()

  // Fetch dashboard metrics
  const [ordersResult, customersResult, ingredientsResult, productionResult] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: false }),
    supabase.from("customers").select("*", { count: "exact", head: true }),
    supabase.from("ingredients").select("*"),
    supabase.from("production_batches").select("*", { count: "exact", head: false }),
  ])

  const orders = ordersResult.data || []
  const totalOrders = ordersResult.count || 0
  const totalCustomers = customersResult.count || 0
  const ingredients = ingredientsResult.data || []
  const production = productionResult.data || []

  // Calculate metrics
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const inProductionOrders = orders.filter((o) => o.status === "in_production").length
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0)
  const lowStockItems = ingredients.filter((i) => i.current_stock <= i.minimum_stock).length
  const activeProduction = production.filter((p) => p.status === "in_progress").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Página inicial</h1>
        <p className="text-muted-foreground">Visão geral do sistema de pedidos da Sabor Real</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">{pendingOrders} pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Total cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Todos os pedidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Em Produção</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProductionOrders}</div>
            <p className="text-xs text-muted-foreground">{activeProduction} lotes ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Ingredientes críticos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingredientes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ingredients.length}</div>
            <p className="text-xs text-muted-foreground">Total cadastrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrders orders={orders.slice(0, 5)} />
        <StockAlerts ingredients={ingredients.filter((i) => i.current_stock <= i.minimum_stock)} />
      </div>
    </div>
  )
}
