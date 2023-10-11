import { kv } from '@vercel/kv'

export async function putDocument({ id, document }: {id: string, document: string}) {
    await kv.set(id, document);
}
