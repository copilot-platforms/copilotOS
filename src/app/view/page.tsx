import { View as ViewComponent } from '@/components/View'
import { fetchDocument } from '@/app/actions/fetchDocument';

export default async function View({ searchParams }:  { searchParams: SearchParams }) {
    const document = await fetchDocument(searchParams.name as PageName);
    return <ViewComponent document={document} />;
}
