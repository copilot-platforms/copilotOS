import { kv } from '@vercel/kv'

export async function fetchDocumentById({ id }: {id: string}) {
    const document = await kv.get<string>(id);
    if (!document) {
        throw new Error('document not found');
    }
    return document;
}
