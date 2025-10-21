import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@/lib/actions/Sessions';
import prisma from '@/lib/PrismaClient/db';
import { OrderSchema } from '@/types/shop';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  const result = OrderSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  // if (!(await isAuthenticated())) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Get the user ID from the session
    const userId = (await getSession())?.user.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.create({
      data: {
        user_id: userId,
        total_price: result.data.total_price,
        status: result.data.status,
        payment_method: result.data.payment_method,
        transaction_id: result.data.transaction_id,
        orderItems: result.data.orderItems
          ? { create: result.data.orderItems }
          : undefined,
      },
    });

    return NextResponse.json(
      { data: order, message: 'Order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error creating order:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
