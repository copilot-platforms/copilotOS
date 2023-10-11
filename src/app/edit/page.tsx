import EditClient from '@/app/edit/client';
import { getContent } from '@/app/actions/fetchCopilotData';
import { API_KEYS } from '@/app/actions/getApiKey';
import { fetchDocument } from '@/app/actions/fetchDocument';

export default async function Edit({ searchParams }:  { searchParams: SearchParams }) {
  const apiKey = API_KEYS[searchParams.name as PageName];
  const data = await getContent(searchParams, apiKey)
  if (!data.me) throw new Error('could not find copilot data')
  const document = await fetchDocument(data.me.id, data.me.portalName) ?? 'Hello, World!';
  return (
    <EditClient document={document} name={searchParams.name as PageName} />
  )
}
