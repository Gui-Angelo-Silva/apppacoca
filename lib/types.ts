export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  cpf_cnpj?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: string
  order_number: string
  order_date: string
  delivery_date?: string
  status: "pending" | "confirmed" | "in_production" | "ready" | "delivered" | "cancelled"
  total_amount: number
  payment_method?: string
  payment_status: "pending" | "paid" | "partial" | "cancelled"
  notes?: string
  created_at: string
  updated_at: string
  customer?: Customer
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

export interface Ingredient {
  id: string
  name: string
  unit: string
  current_stock: number
  minimum_stock: number
  unit_cost: number
  supplier?: string
  created_at: string
  updated_at: string
}

export interface ProductionBatch {
  id: string
  batch_number: string
  order_id?: string
  production_date: string
  quantity_produced: number
  status: "in_progress" | "completed" | "cancelled"
  notes?: string
  created_at: string
  updated_at: string
  order?: Order
}

export interface Notification {
  id: string
  customer_id: string
  order_id: string
  type: string
  message: string
  sent_at?: string
  status: "pending" | "sent" | "failed"
  created_at: string
}
