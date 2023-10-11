export function View({ document }: {document: string}) {
    return (
        <article dangerouslySetInnerHTML={{__html: document}} />
    )
}
