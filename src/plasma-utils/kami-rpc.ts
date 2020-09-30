import { ethers } from 'ethers';

interface JsonResponse {
  jsonrpc: '2.0';
  result?: any;
  error?: {
    code: number;
    message: string;
    data: any;
  };
  id: string | null;
}

export async function kamiRpc(url: string, methodName: string, params: any[] = []): Promise<any> {
  const response: JsonResponse = await ethers.utils.fetchJson(
    url,
    JSON.stringify({
      jsonrpc: '2.0',
      method: methodName,
      params: params instanceof Array ? params : [params],
      id: null,
    })
  );

  if (response.error) {
    const error = new Error(response.error.message);
    if (response.error.data) {
      // @ts-ignore
      error.data = response.error.data;
    }
    throw error;
  }

  return response.result;
}

export async function getProposalFromKami(
  url: string,
  startBlockNumber: number,
  bunchDepth: number
) {
  const result = await kamiRpc(url, 'informer_computeBunchProposal', [
    startBlockNumber,
    bunchDepth,
  ]);
  return result;
}
