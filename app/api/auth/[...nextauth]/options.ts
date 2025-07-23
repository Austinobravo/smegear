import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

import prisma from '@/prisma/prisma'
import { comparePassword } from "@/lib/utils";
import { emojiRegex } from "@/lib/formSchema";

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

                if(credentials.email.trim().length <= 1 || credentials.password.trim().length <= 1) throw new Error('Invalid credentials')

                if (credentials.email.match(emojiRegex) || credentials.password.match(emojiRegex)) {
                throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email.trim(), 
                    },
                    
                })

                if (!user) throw new Error("Invalid credentials")

                const isCorrectPassword = await comparePassword(credentials.password, user.passwordHash.trim())
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