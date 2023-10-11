'use server';

import { generateDocumentID } from '@/app/actions/generateDocumentID';
import { kv } from '@vercel/kv'

export async function putDocument(userId: string, portalName: string) {
    const id = await generateDocumentID(userId, portalName);
    await kv.set(id, document);
}
