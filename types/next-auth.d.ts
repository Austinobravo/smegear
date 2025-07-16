import type { User } from "next-auth";
import { User as UserType } from "./generated/prisma";

declare module 'next-auth'{
    interface User{
        id: string
        email: string
    }
}
declare module 'next-auth'{
    interface Session{
        user:UserType
    }
}