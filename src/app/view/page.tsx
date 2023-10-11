import { View as ViewComponent } from '@/components/View'
import { fetchDocumentById } from '@/app/actions/fetchDocumentById';

export default async function View() {
    const document = await fetchDocumentById('testing123');
    return <ViewComponent document={document} />;
}
