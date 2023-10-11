import { View as ViewComponent } from '@/components/View'
import { Error as ErrorComponent } from '@/components/Error'
import { fetchDocument } from '@/app/actions/fetchDocument';
import { API_KEYS } from '@/app/actions/getApiKey';
import { getContent } from '@/app/actions/fetchCopilotData';

export default async function View({ searchParams }:  { searchParams: SearchParams }) {
    const apiKey = API_KEYS[searchParams.name as PageName];
    if (!apiKey) return <ErrorComponent msg="You do not have the correct API credentials to run this custom app"/>;
    const data = await getContent(searchParams, apiKey);
    if (!data.me?.portalName) return <ErrorComponent msg="Could not find Copilot data"/>;
    const document = await fetchDocument(data.me.id, data.me.portalName);
    return <ViewComponent document={document} />;
}
