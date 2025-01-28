import prisma from "@/lib/PrismaClient/db";
import { getSession } from "@/lib/actions/Sessions";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json(
      { message: "You are not authenticated" },
      { status: 400 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("Error fetching orders: ", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
