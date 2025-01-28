import isAdmin from "@/lib/actions/Admin";
import prisma from "@/lib/PrismaClient/db";
import { ItemCategorySchema } from "@/types/shop";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const MerchandiseSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock_quantity: z.number(),
  category: ItemCategorySchema,
  image_url: z.string().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const checkAdmin = await isAdmin();
    if (!checkAdmin) {
      return NextResponse.json(
        { error: "You are not authorized to perform this action" },
        { status: 403 }
      );
    }

    // Validate the data against the schema
    const res = MerchandiseSchema.safeParse(data);
    if (!res.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: res.error.errors },
        { status: 400 }
      );
    }

    // Add the merchandise to the database
    const merchandise = await prisma.merchandise.create({
      data: {
        ...res.data,
      },
    });

    // Return the created merchandise
    return NextResponse.json(merchandise, { status: 201 });
  } catch (error) {
    console.error("Error creating merchandise:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
