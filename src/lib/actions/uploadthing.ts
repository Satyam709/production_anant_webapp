"use server"
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function uploadServerSideFile(file: File) {
  try {
    const response = await utapi.uploadFiles(file);
    console.log("Upload complete for userId:", response);
    console.log("Upload complete for userId:", response.data?.ufsUrl);
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}