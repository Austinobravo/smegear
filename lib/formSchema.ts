import { z } from "zod";
import { validateForEmptySpaces } from "./globals";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const AcceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu


export const WaitlistFormSchema = z.object({
    name: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
    email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  })
export const ContactFormSchema = z.object({
    name: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
    email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
    message: z.string().length(256, {message: "Maximum characters is 256."}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
    terms: z.boolean().default(false).refine((value) => value, {message: "Please check this."}),
  })
export const SignInFormSchema = z.object({
  email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  password: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  })
export const AboutMeFormSchema = z.object({
  about: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  })
export const SaveEducationFormSchema = z.object({
  education: z.array(
    z.object({
      institutionName: z.string().min(1, { message: "Institution name is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      fieldOfStudy: z.string().min(1, { message: "Field of study is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      degree: z.string().min(1, { message: "Degree is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      yearOfGraduation: z.string().min(1, { message: "Institution name is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      isCurrent: z.boolean().optional(),
    })
  )
});
export const SaveCertificationFormSchema = z.object({
  education: z.array(
    z.object({
      institutionName: z.string().min(1, { message: "Institution name is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      fieldOfStudy: z.string().min(1, { message: "Field of study is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      degree: z.string().min(1, { message: "Degree is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      yearOfGraduation: z.string().min(1, { message: "Institution name is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      isCurrent: z.boolean().optional(),
    })
  )
});
export const WorkExperienceFormSchema = z.object({
  experiences: z.array(
    z.object({
      positionTitle: z.string().min(1, { message: "Position title is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      companyName: z.string().min(1, { message: "Company name is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      location: z.string().min(1, { message: "Location is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      responsibilities: z.string().min(1, { message: "Responsibilities is required" }).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
      duration: z.object({
        from: z.date({ required_error: "Start date is required" }),
        to: z.date().optional()
      }).refine(data => !data.to || data.from <= data.to, {
        message: "Start date must be before end date",
        path: ["to"],
      }),
      isCurrent: z.boolean().optional(),
    })
  )
});

  export const ProfilePictureFormSchema = z.object({
    file: z
    .any().optional()
    .refine((file) => {
      if (!file) return true;
      return file instanceof File;
    }, { message: "Invalid file input" })
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }, { message: "File max size is 5MB" })
    .refine((file) => {
      if (!file) return true;
      return AcceptedFileTypes.includes(file.type);
    }, { message: "Only jpg, png, gif, or pdf files are accepted" })
    // .refine((file) => {
    //   return file && (file instanceof File || (file instanceof FileList && file.length > 0));
    // }, {
    //   message: "Please upload a file.",
    // }),

  })

export const TalentSignUpFormSchema = z.object({
  firstName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  lastName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  phone: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  confirmPassword: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  password: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  }).refine((data) => data.confirmPassword === data.password, {message: "Password don't match", path: ['confirmPassword']})

  export const EmployerSignUpFormSchema = z.object({
  firstName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  lastName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  company: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  phone: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  confirmPassword: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  password: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  }).refine((data) => data.confirmPassword === data.password, {message: "Password don't match", path: ['confirmPassword']})
  
  export const TalentManagerSignupFormSchema = z.object({
  firstName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  lastName: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // company: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  phone: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  email: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  confirmPassword: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  password: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  }).refine((data) => data.confirmPassword === data.password, {message: "Password don't match", path: ['confirmPassword']})

  export const PostAJobFormSchema = z.object({
  title: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  company: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  salary: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  description: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  url: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  deadline: z.string(),
  typeOfWork: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  experienceLevel: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  location: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  classification: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  })
  // export const PostAJobFormSchema = z.object({
  // job_title: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // company_name: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // salary: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // job_description: z.string().email({message: "Invalid email"}).min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // job_link: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // application_deadliine: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // job_location: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // experience_level: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // job_city_state: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // job_classification: z.string().min(1, {message: "This field is mandatory"}).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu), {message: "No emoji's alllowed."}),
  // })
