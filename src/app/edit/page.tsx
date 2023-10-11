import EditClient from "@/app/edit/client";
import { Error as ErrorComponent } from "@/components/Error";
import { getContent } from "@/app/actions/fetchCopilotData";
import { API_KEYS } from "@/app/actions/getApiKey";
import { fetchDocument } from "@/app/actions/fetchDocument";

export default async function Edit({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const apiKey = API_KEYS[searchParams.name as PageName];
  if (!apiKey)
    return (
      <ErrorComponent msg="You do not have the correct API credentials to run this custom app" />
    );
  const data = await getContent(searchParams, apiKey);
  if (!data.me) return <ErrorComponent msg="Could not find Copilot data" />;
  const document =
    (await fetchDocument(data.me.id, data.me.portalName)) ?? "Hello, World!";
  return (
    <EditClient document={document} name={searchParams.name as PageName} />
  );
}
