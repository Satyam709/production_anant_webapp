import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/PrismaClient/db";
import { ItemCategorySchema } from "@/types/shop";

const MerchEditSchema = z.object({
  item_id: z.number().nonnegative(),
  name: z.string().min(1, "Name is required"),
  price: z.number().nonnegative("Price must be non-negative"),
  description: z.string().optional(),
  category:ItemCategorySchema,
  image_url: z.string().url("Invalid image URL").optional(),
  stock_quantity: z.number().int().min(0, "Stock must be non-negative"),
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const result = MerchEditSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return NextResponse.json(
        { error: errorMessages.join(", ") },
        { status: 400 }
      );
    }

    const updatedMerch = await prisma.merchandise.update({
      where: { item_id: result.data.item_id },
      data: {
        name: result.data.name,
        price: result.data.price,
        description: result.data.description,
        image_url: result.data.image_url,
        stock_quantity: result.data.stock_quantity,
        category:result.data.category
      },
    });

    return NextResponse.json(
      {
        message: "Merchandise updated successfully",
        data: updatedMerch,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating merchandise:", error);
    return NextResponse.json(
      { error: "Failed to update merchandise" },
      { status: 500 }
    );
  }
}
