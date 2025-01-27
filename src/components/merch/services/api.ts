import {
  ApiResponse,
  Merchandise,
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
} from "../../../types/shop";

const API_BASE_URL = "/api";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let errorMessage = "An error occurred";

    try {
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        errorMessage = data.error || errorMessage;
      } else {
        errorMessage = await response.text();
      }
    } catch (e) {
      errorMessage = `Failed to process response: ${response.statusText}`;
    }

    throw new ApiError(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    throw new ApiError("Invalid JSON response from server");
  }
}

// Demo data for development
const demoOrders: Order[] = [
  {
    order_id: 1,
    user_id: "user123",
    total_price: 1397,
    status: "PENDING",
    payment_method: "UPI",
    transaction_id: "TXN123456",
    created_at: new Date().toISOString(),
    orderItems: [
      {
        order_item_id: 1,
        order_id: 1,
        item_id: 1,
        quantity: 1,
        price_per_item: 499,
        merchandise: {
          item_id: 1,
          name: "Infinity Series T-Shirt",
          description:
            "Premium cotton t-shirt featuring the mesmerizing infinity series pattern.",
          price: 499,
          stock_quantity: 50,
          category: "Apparel",
          image_url:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    ],
  },
];

export const shopApi = {
  // Merchandise endpoints
  async getMerchandise(): Promise<ApiResponse<Merchandise[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/merchandise`);
      return handleResponse<ApiResponse<Merchandise[]>>(response);
    } catch (error) {
      // Return demo data during development
      return { data: [], error: null };
    }
  },

  async getMerchandiseById(id: number): Promise<ApiResponse<Merchandise>> {
    try {
      const response = await fetch(`${API_BASE_URL}/merchandise/${id}`);
      return handleResponse<ApiResponse<Merchandise>>(response);
    } catch (error) {
      throw new ApiError("Failed to fetch merchandise");
    }
  },

  async createMerchandise(
    data: Partial<Merchandise>
  ): Promise<ApiResponse<Merchandise>> {
    try {
      const response = await fetch(`${API_BASE_URL}/merchandise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse<ApiResponse<Merchandise>>(response);
    } catch (error) {
      throw new ApiError("Failed to create merchandise");
    }
  },

  async updateMerchandise(
    id: number,
    data: Partial<Merchandise>
  ): Promise<ApiResponse<Merchandise>> {
    try {
      const response = await fetch(`${API_BASE_URL}/merchandise/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse<ApiResponse<Merchandise>>(response);
    } catch (error) {
      throw new ApiError("Failed to update merchandise");
    }
  },

  async deleteMerchandise(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/merchandise/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      return handleResponse<ApiResponse<void>>(response);
    } catch (error) {
      throw new ApiError("Failed to delete merchandise");
    }
  },

  // Order endpoints
  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      return handleResponse<ApiResponse<Order[]>>(response);
    } catch (error) {
      // Return demo data during development
      return { data: demoOrders, error: null };
    }
  },

  async createOrder(
    orderData: CreateOrderRequest
  ): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(orderData),
      });
      return handleResponse<ApiResponse<Order>>(response);
    } catch (error) {
      throw new ApiError("Failed to create order");
    }
  },

  async updateOrderStatus(
    orderId: number,
    data: UpdateOrderStatusRequest
  ): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse<ApiResponse<Order>>(response);
    } catch (error) {
      throw new ApiError("Failed to update order status");
    }
  },
};
