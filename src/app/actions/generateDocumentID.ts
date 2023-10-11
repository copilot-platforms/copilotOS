import { CopilotAPI } from "@/utils/copilotApiUtils";

export async function generateDocumentID(id: string, portalName: string) {
  return `${id}-${encodeURIComponent(portalName.split(" ").join("_"))}`;
}
