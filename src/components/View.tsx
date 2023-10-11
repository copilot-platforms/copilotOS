export function View({ document }: { document: string }) {
  return <article className="tiptap" dangerouslySetInnerHTML={{ __html: document }} />;
}
