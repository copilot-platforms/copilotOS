"use server";

import { put, PutBlobResult } from "@vercel/blob";

export async function postImage(data: FormData): Promise<PutBlobResult> {
  const file = data.get("body") as File;
  return put(file.name, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
