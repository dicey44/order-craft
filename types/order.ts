export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "ready_to_ship" | "completed" | "cancelled" | "awaiting_payment";
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}