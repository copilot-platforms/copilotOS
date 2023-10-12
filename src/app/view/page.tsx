import { View as ViewComponent } from "@/components/View";
import { Error as ErrorComponent } from "@/components/Error";
import { fetchDocument } from "@/app/actions/fetchDocument";
import { API_KEYS } from "@/app/actions/getApiKey";
import { getContent } from "@/app/actions/fetchCopilotData";
import { Client } from "@/utils/copilotApiUtils";

const isValidField = (val: string): val is keyof Client => {
  return ["id", "givenName", "familyName", "email", "companyId"].includes(val);
};

export default async function View({
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
  if (!data.me?.portalName)
    return <ErrorComponent msg="Could not find Copilot data" />;
  const document = await fetchDocument(data.me.id, data.me.portalName);

  const regex = new RegExp("{{client.[a-zA-Z0-9]*}}", "g");
  const matches = document.match(regex) || [];
  var finalDoc = document;
  for (const match of matches) {
    const field = match.substring(9, match.length - 2) || "";
    if (data.client && isValidField(field)) {
      finalDoc = finalDoc.replace(match, data.client[field].toString());
    }
  }
  return <ViewComponent document={finalDoc} name={searchParams.name} />;
}
