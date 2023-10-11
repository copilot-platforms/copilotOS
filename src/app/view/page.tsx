import { fetchDocument } from '@/app/actions/fetchDocument'
import { View as ViewComponent } from '@/components/View'
import { putDocument } from '../actions/putDocument';
import { fetchDocumentById } from '../actions/fetchDocumentById';

export default async function View() {
    const document = await fetchDocumentById('testing123');
    return <ViewComponent document={document} />;
}
