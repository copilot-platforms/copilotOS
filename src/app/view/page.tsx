import { fetchDocument } from '@/app/actions/fetchDocument'
import { View as ViewComponent } from '@/components/View'

export default async function View() {
    const { document } = await fetchDocument();
    return <ViewComponent document={document} />;
}
