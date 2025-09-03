import { emojiRegex } from "@/lib/formSchema";
import { validateForEmptySpaces } from "@/lib/globals";
import { z } from "zod";

export const CourseCreateSchema = z.object({
  title: z.string().min(1, "Title is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  description: z.string().optional().refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value || !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  imageUrl: z.string().url("Invalid URL").optional(),
  price: z.coerce.number().min(0, "Price must be >= 0").optional(),
  published: z.boolean().optional(),
  // instructorId: z.string().min(1, "Instructor ID is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
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
export const ModuleUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  courseId: z.string().optional(),
  order: z.number().optional(),
});

export const LessonSchema = z.object({
  title: z.string().min(1, "Title is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  content: z.string().optional().refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value || !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  videoUrl: z.string().url().optional(),
  moduleId: z.string().min(1, "Module Id is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  order: z.number().int().min(1, "Order must be >= 1"),
});

export const LessonUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  order: z.number().int().min(0).optional(),
});

export const ProgressSchema = z.object({
  lessonId: z.string().min(1, "Lesson Id is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  completed: z.boolean().optional(),
});

export const ProgressUpdateSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
});

export const ReviewSchema = z.object({
  courseId: z.string().uuid().min(1, "Course Id is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const ReviewUpdateSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
});