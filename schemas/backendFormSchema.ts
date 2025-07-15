import { z } from "zod";

export const CourseCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL").optional(),
  price: z.coerce.number().min(0, "Price must be >= 0"), 
  published: z.boolean().optional(),
  instructorId: z.string().min(1, "Instructor ID is required"),
});

export const CourseUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  price: z.coerce.number().min(0, "Price must be >= 0").optional(),
  published: z.boolean().optional(),
});

