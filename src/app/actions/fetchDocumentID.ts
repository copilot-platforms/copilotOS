import { CopilotAPI } from "@/utils/copilotApiUtils";
import { API_KEYS } from '@/app/actions/getApiKey';

async function getContent(apiKey?: string) {  
  if (!apiKey) {
    throw new Error('Could not find apiKey');
  }
  const copilotAPI = new CopilotAPI(apiKey)
  return copilotAPI.me();
  }

export async function fetchDocumentID(name: PageName) {
    const apiKey = API_KEYS[name] || process.env.COPILOT_API_KEY;
    const data = await getContent(apiKey);
    return `${data.id}-${encodeURIComponent(data.portalName.split(' ').join('_'))}`;
}
