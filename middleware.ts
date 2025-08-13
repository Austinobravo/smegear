import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/lib/globals";

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const headers = new Headers();

    // Allowed CORS origins
    const allowedOrigins = ["http://localhost:3000", "https://smegear.vercel.app"];
    const origin = req.headers.get("origin");

    if (origin && allowedOrigins.includes(origin)) {
        headers.set("Access-Control-Allow-Origin", origin);
    }

    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Allow-Credentials", "true");

    // Handle CORS Preflight Requests
    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 204, headers });
    }

    // Authentication for /api/superuser routes
    if (pathname.startsWith("/api/superuser")) {
        const response = await fetch(`${BASE_URL}/api/auth/session`, {
            headers: { Cookie: req.headers.get("cookie") || "" },
        });

        if (response.status !== 200) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const session = await response.json();

        if (session?.user?.role !== "superuser") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
    }

    const response = NextResponse.next();

    // Attach CORS headers to the response
    headers.forEach((value, key) => response.headers.set(key, value));

    return response;
}

// Apply middleware to all API routes
export const config = {
    matcher: "/api/:path*",
};