import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

import prisma from '@/prisma/prisma'
import { comparePassword } from "@/lib/utils";

export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'username',
                    placeholder: 'Your username',
                    type: 'username'
                },
                password: {
                    label: 'password',
                    placeholder: 'Your Password',
                    type: 'password'
                },
            },
            async authorize(credentials){
                if (!credentials?.username || !credentials.password) throw new Error('Invalid credentials')

                if(credentials.username.trim().length <= 1 || credentials.password.trim().length <= 1) throw new Error('Invalid credentials')

                if (credentials.username.match(/\p{Emoji}/gu) || credentials.password.match(/\p{Emoji}/gu)) throw new Error('Invalid credentials')

                const user = await prisma.user.findUnique({
                    where:{
                        username: credentials.username.trim(), 
                    },
                    
                })

                if (!user) throw new Error("Invalid user credentials")

                const isCorrectPassword = await comparePassword(credentials.password, user.password.trim())
                if(!isCorrectPassword) throw new Error("Invalid credentials")

                const { password, ...UserWithoutPassword } = user 
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
                    username: token.username as string,
                    
                }
            }
        },
        async jwt ({token, user}) {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: (user as any).username,
                }
            }
            return token
            
        },
    }
}