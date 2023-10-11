import { CopilotAPI, Client, Company, MeResponse } from '@/utils/copilotApiUtils';

export async function getContent(searchParams: SearchParams, apiKey?: string) {  
  if (!apiKey) {
    throw new Error('Could not find apiKey');
  }
  const copilotAPI = new CopilotAPI(apiKey)
  const result: { client?: Client, company?: Company, me?: MeResponse } = {};

  if (searchParams.clientId && typeof searchParams.clientId === 'string') {
    result.client = await copilotAPI.getClient(searchParams.clientId)
  }

  if (searchParams.companyId && typeof searchParams.companyId === 'string') {
    result.company = await copilotAPI.getCompany(searchParams.companyId)
  }

  result.me = await copilotAPI.me();
  
  return result;
}
