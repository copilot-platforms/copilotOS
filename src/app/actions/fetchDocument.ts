import { generateDocumentID } from '@/app/actions/generateDocumentID';
import { kv } from '@vercel/kv'

export async function fetchDocument(userId: string, portalName: string) {
    const id = await generateDocumentID(userId, portalName);
    const document = await kv.get<string>(id);
    return document ?? 'Hello, World!';
}
