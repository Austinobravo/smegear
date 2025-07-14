import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const comparePassword = async (currentPassword: string, hashPassword: string) => {
    const isPasswordCorrect = bcrypt.compareSync(currentPassword, hashPassword)
    return isPasswordCorrect
}

export const createVerificationToken = (email: string) => {
    const secret = process.env.JWT_SECRET!
    return jwt.sign({ email }, secret, { expiresIn: "1h" })
  }
export const validateForEmptySpaces = (value: string) => {
    return value.trim().length >= 1
}

export const formatDate = (date: number | string) => {
    const language = "en-US"
    const options:Intl.DateTimeFormatOptions = {weekday:"long",day: "2-digit", month: "short", year: "numeric"}
    return new Date(date).toLocaleDateString(language, options )
}



export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export const locations = [
    "Remote",
    "Hybrid",
    "On Site",
    "other"
]

export const level_of_work = [
    "Entry level/graduate",
    "Junior level (1 -2 years)",
    "Mid level (3 -4 years)",
    "Senior level (5 - 8 years)",
    "Expert and leadership (9+ years)",
    "other"

]

export const type_of_role = [
    "Software Engineering",
    "Data",
    "Product",
    "Design",
    "Operations and Strategy",
    "Sales and Account Management",
    "Marketing",
    "People, Hr, Recruitment",
    "Finance, Legal and Compliance",
    "other"
]

export const getShareableLink = (data:any, socialType: string) => {
    switch (socialType) {
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${data.link}/`
        case "whatsapp":
            return  `https://wa.me/?text=${encodeURI(data.title)}%20-%20${data.link}/`
        case "mail":
            return `mailto:?subject=${encodeURI(data.title)}&BODY=${data.link}`
        case "twitter":
            return `https://x.com/intent/tweet?text=Check%20out%20this%20article:${encodeURI(data.title)}%20-%20${data.link}/`
                    
        default:
            return ''
    }
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.API_URL;

    
// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL