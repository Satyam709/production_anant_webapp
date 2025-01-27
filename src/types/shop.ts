import { z } from "zod";

// Enums
export const ItemCategorySchema = z.enum([
  "Apparel",
  "Accessories",
  "Stationery",
  "Gadgets",
  "Books",
]);
export type ItemCategory = z.infer<typeof ItemCategorySchema>;

export enum ItemCategoryEnum {
  Apparel = "Apparel",
  Accessories = "Accessories",
  Stationery = "Stationery",
  Gadgets = "Gadgets",
  Books = "Books",
}

export const OrderStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

// Merchandise Schema
export const MerchandiseSchema = z.object({
  item_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock_quantity: z.number(),
  category: ItemCategorySchema,
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Merchandise = z.infer<typeof MerchandiseSchema>;

// Order Item Schema
export const OrderItemSchema = z.object({
  order_item_id: z.number().optional(),
  order_id: z.number().optional(),
  item_id: z.number(),
  quantity: z.number(),
  price_per_item: z.number(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

// Order Schema
export const OrderSchema = z.object({
  user_id: z.string().optional(),
  total_price: z.number(),
  status: OrderStatusSchema,
  payment_method: z.string().nullable(),
  transaction_id: z.string().nullable(),
  created_at: z.string().optional(),
  orderItems: z.array(OrderItemSchema).optional(),
});
export type Order = z.infer<typeof OrderSchema>;

// API Response Schema
export const ApiResponseSchema = z.object({
  data: z.unknown(),
  error: z.string().nullable(),
});
export type ApiResponse<T> = z.infer<typeof ApiResponseSchema> & { data: T };

// Request Schemas
export const CreateOrderRequestSchema = z.object({
  items: z.array(
    z.object({
      item_id: z.number(),
      quantity: z.number(),
    })
  ),
  payment_method: z.string(),
  transaction_id: z.string(),
});
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export const UpdateOrderStatusRequestSchema = z.object({
  status: OrderStatusSchema,
  remarks: z.string().optional(),
});
export type UpdateOrderStatusRequest = z.infer<
  typeof UpdateOrderStatusRequestSchema
>;
// Request Schemas

export const getProductsSchema = z.array(MerchandiseSchema);