'use server';

import { fetchDocumentID } from '@/app/actions/fetchDocumentID';
import { kv } from '@vercel/kv'

export async function putDocument(name: PageName, document: string) {
    const id = await fetchDocumentID(name);
    await kv.set(id, document);
}
