// import { NextResponse } from "next/server";
// import { swaggerSpec } from "@/lib/swagger";

// export async function GET() {
//   return NextResponse.json(swaggerSpec);
// }

import { NextResponse } from 'next/server';
import { getApiDocs } from '@/lib/swagger';

export async function GET() {
  const spec = getApiDocs();
  return NextResponse.json(spec);
}
