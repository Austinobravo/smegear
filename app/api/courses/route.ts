import { NextResponse } from "next/server";
import { CourseTitleSchema } from "@/lib/formSchema";

// (In real apps you'd persist to a DB; this just echoes a created object.)
export async function POST(req: Request) {
  try {
    const json = await req.json();

    const parsed = CourseTitleSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // fake "create"
    const created = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
