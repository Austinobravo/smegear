// lib/getProfile.ts
import axios from "axios";
import { cookies } from "next/headers";
// import { BASE_URL } from "./globals";

export async function getProfile() {
  try{
    const token = (await cookies()).get("token")?.value;
  
    if (!token) return null;
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as UserDataType

  }catch(error){
    console.error("Error in server user", error)
    return null

  }
}
