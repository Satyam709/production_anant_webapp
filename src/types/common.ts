import z from "zod";

// Schema to validate a 9-digit roll number
export const rollNumberSchema = z.string().regex(/^\d{9}$/, {
  message: "Roll number must be exactly 9 digits",
});



export type AlbumType = {
  id: string;
  name: string;
  images: { id: string; url: string }[];
  createdAt: Date;
};