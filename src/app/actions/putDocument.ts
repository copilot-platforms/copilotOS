"use server";

import { generateDocumentID } from "@/app/actions/generateDocumentID";
import { kv } from "@vercel/kv";
import { getContent } from "@/app/actions/fetchCopilotData";
import { API_KEYS } from "./getApiKey";

export async function putDocument(name: string, document: string) {
  const apiKey = API_KEYS[name as PageName];
  const data = await getContent({}, apiKey);
  if (!data.me) throw new Error("could not fetch data");
  const id = await generateDocumentID(data.me.id, data.me.portalName);
  await kv.set(id, document);
}
