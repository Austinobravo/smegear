import { z } from "zod";
import { validateForEmptySpaces } from "./globals";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const AcceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
export const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const CourseTitleSchema = z
  .object({
    title: z.string().min(2, "Title is too short"),
  // description: z.string().min(10, "Please add a longer description"),
  // imageUrl: z.string().url("Must be a valid URL"),
  // price: z.coerce.number().min(0, "Price cannot be negative"),
  // published: z.boolean().default(false),
  })

  export const CourseCreateSchema = z.object({
    title: z.string().min(1, "Title is required").refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's allowed."}),
    description: z.string().optional().refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value || !value.match(emojiRegex), {message: "No emoji's allowed."}),
    imageUrl: z.string().url("Invalid URL").optional(),  
    price: z.coerce.number().min(0, "Price must be >= 0").optional(),
    published: z.boolean().optional(),
  })