import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/PrismaClient/db"; // Ensure this points to the correct instance of Prisma client
import { OrderStatusSchema } from "@/types/shop"; // Import your OrderStatus schema if needed
import { getSession } from "@/lib/actions/Sessions"; // Ensure session handler works properly

// Schema for validating the approval request
const ApprovalSchema = z.object({
  order_id: z.number().min(1, "Order ID is required"),
  status: OrderStatusSchema,
  remarks: z.string().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    // Parse the body of the request
    const body = await req.json();
    const result = ApprovalSchema.safeParse(body);

    // Check if user is authenticated
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    // Verify user position for authorization
    if (!user?.position || user.position === "Member") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // If validation fails, return validation errors
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Find the order in the database
    const order = await prisma.order.findUnique({
      where: {
        order_id: result.data.order_id,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Update the order status (this assumes you're updating the order itself, not the merchandise)
    const updatedOrder = await prisma.order.update({
      where: {
        order_id: result.data.order_id,
      },
      data: {
        status: result.data.status, // Update order status
      },
    });

    // If remarks are provided, you might want to update the AdminVerification table or elsewhere
    await prisma.adminVerification.upsert({
      where: {
        order_id: result.data.order_id,
      },
      create: {
        order_id: result.data.order_id,
        admin_id: user.id,
        status: result.data.status,
        remarks: result.data.remarks,
      },
      update: {
        status: result.data.status,
        remarks: result.data.remarks,
      },
    });

    // Respond with success message
    return NextResponse.json(
      {
        message: `Order status updated to ${result.data.status.toLowerCase()} successfully`,
        data: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
