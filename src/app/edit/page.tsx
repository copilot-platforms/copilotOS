import EditClient from '@/app/edit/client';
import { fetchDocument } from '@/app/actions/fetchDocument';

export default async function Edit({ searchParams }:  { searchParams: SearchParams }) {
  const document = await fetchDocument(searchParams.name as PageName) ?? 'Hello, World!';
  return (
    <EditClient document={document} name={searchParams.name as PageName} />
  )
}
