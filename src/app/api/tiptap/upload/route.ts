import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  if (!filename) {
    return NextResponse.json({
      error: "filename is required",
    });
  }

  if (!request?.body) {
    return NextResponse.json({
      error: "body is required",
    });
  }

  const blob = await put(filename, request?.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
