import * as z from "zod";


export const reviewSchema = z.object({
  id: z.string(),
  rating: z.coerce.number(),
  comment: z.string(),
  createdAt: z.string(),
});


export type ReviewType = z.infer<typeof reviewSchema>;