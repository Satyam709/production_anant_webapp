import { Internship } from "@prisma/client";

export interface InternshipWithUser extends Internship {
  user: {
    name: string;
    imageURL: string | null;
    branch: string | null;
    batch: string | null;
  };
}
