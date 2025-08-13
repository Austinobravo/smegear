import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

import prisma from '@/prisma/prisma'
import { comparePassword } from "@/lib/utils";
import { emailRegex, emojiRegex } from "@/lib/formSchema";

export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    placeholder: 'Your email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    placeholder: 'Your Password',
                    type: 'password'
                },
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials.password) throw new Error('Invalid credentials')
                const email = credentials.email.toLowerCase()
                const password = credentials.password

                if(email.trim().length <= 1 || password.trim().length <= 1) throw new Error('Invalid credentials')

                if (email.match(emojiRegex) || password.match(emojiRegex)) {
                throw new Error("Invalid credentials");
                }

                const isEmail = email.match(emailRegex)

                const user = await prisma.user.findFirst({
                    where:{
                       OR: [
                        {
                            email: email
                        },
                        {
                            username: email
                        }
                       ]
                    },
                    
                })

                if(!user?.isEmailVerified) throw new Error("Unverified email")

                if (!user) throw new Error("Invalid credentials")

                const isCorrectPassword = await comparePassword(password, user.passwordHash.trim())
                if(!isCorrectPassword) throw new Error("Invalid credentials")

                const { passwordHash, ...UserWithoutPassword } = user 
                return UserWithoutPassword
            }
        })
    ],
    // pages: {
    //     signIn: '/login',
    //     error: '/login'
    // },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    callbacks: {
        session: async ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                    
                }
            }
        },
        async jwt ({token, user}) {
            if(user){
                return {
                    ...token,
                    id: user?.id,
                    email: (user as any).email,
                }
            }
            return token
            
        },
    }
}