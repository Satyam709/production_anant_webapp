"use server";

import prisma from "../PrismaClient/db";
import { revalidatePath } from "next/cache";

import { JSONContent } from '@tiptap/react';

interface BlogFormData {
  title: string;
  content: string;
  contentJson: JSONContent;
}

export async function createBlog(data: BlogFormData) {
  try {
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        contentJson: data.contentJson,
      },
    });

    revalidatePath("/blogs");
    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog");
  }
}
