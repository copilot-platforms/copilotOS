import { View as ViewComponent } from '@/components/View'
import { fetchDocument } from '@/app/actions/fetchDocument';
import { API_KEYS } from '@/app/actions/getApiKey';
import { getContent } from '@/app/actions/fetchCopilotData';

export default async function View({ searchParams }:  { searchParams: SearchParams }) {
    const apiKey = API_KEYS[searchParams.name as PageName];
    const data = await getContent(searchParams, apiKey);
    if (!data.me?.portalName) return null;
    console.log('====================');
    console.log({ data });
    const document = await fetchDocument(apiKey, data.me.portalName);
    return <ViewComponent document={document} />;
}
