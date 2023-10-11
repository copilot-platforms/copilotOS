import { fetchDocumentID } from '@/app/actions/fetchDocumentID';
import { kv } from '@vercel/kv'

export async function fetchDocument(name: PageName) {
    const id = await fetchDocumentID(name);
    const document = await kv.get<string>(id);
    return document ?? 'Hello, World!';
}
