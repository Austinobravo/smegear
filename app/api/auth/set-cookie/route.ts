import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, body);

    // Store token securely in HTTP-only cookie
    (await cookies()).set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    console.log("data", data)

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.response?.data || "Login failed" }, { status: 401 });
  }
}
