import { emojiRegex } from "@/lib/formSchema";
import { validateForEmptySpaces } from "@/lib/globals";
import { z } from "zod";

export const CourseCreateSchema = z.object({
  title: z.string().min(1, "Title is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  description: z.string().min(1, "Description is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  imageUrl: z.string().url("Invalid URL").optional(),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  published: z.boolean().optional(),
  instructorId: z.string().min(1, "Instructor ID is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
});

export const CourseUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  price: z.coerce.number().min(0, "Price must be >= 0").optional(),
  published: z.boolean().optional(),
});

export const ModuleCreateSchema = z.object({
  title: z.string().min(1, "Title is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  courseId: z.string().min(1, "Course ID is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  order: z.number().min(1, "Order must be >= 1"),
});