import prisma from "@/prisma/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import slug from "slug"


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

export const createNewSlug = async (title: string) => {
    const baseSlug = slug(title);
    let sluggedTitle = baseSlug;

    const existingCourseSlugs = await prisma.course.findMany({
        where:{
            slug:{
                startsWith: baseSlug
            }
        },
        select: {
            slug: true
        }
    })

    if (existingCourseSlugs.length === 0) {
        // If no conflicts, return the base slug
        return sluggedTitle;
    }

    if(existingCourseSlugs.length > 0){
        const verifySuffix = existingCourseSlugs.map(({slug}) => {
            const match = slug.match(new RegExp(`^${baseSlug}-(\\d+)$`));

            return match ? parseInt(match[1], 10) : null
        }).filter((value):value is number => value !== null)

        if(verifySuffix.length > 0){
            const maxSuffix = Math.max(...verifySuffix)
            sluggedTitle = `${baseSlug}-${maxSuffix + 1}`
        }else{
            sluggedTitle = `${baseSlug}-1`
        }

    }
    
    return sluggedTitle
}

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