import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { Ingredient } from "@/lib/types"
import Link from "next/link"

interface StockAlertsProps {
  ingredients: Ingredient[]
}

export function StockAlerts({ ingredients }: StockAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Alertas de Estoque
        </CardTitle>
      </CardHeader>
      <CardContent>
        {ingredients.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todos os ingredientes estão com estoque adequado</p>
        ) : (
          <div className="space-y-4">
            {ingredients.map((ingredient) => (
              <Link
                key={ingredient.id}
                href="/inventory"
                className="flex items-center justify-between rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 transition-colors hover:bg-yellow-500/10"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{ingredient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Estoque mínimo: {ingredient.minimum_stock} {ingredient.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-yellow-600">
                    {ingredient.current_stock} {ingredient.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">Disponível</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
