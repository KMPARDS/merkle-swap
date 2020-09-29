import { kamiRpc } from './kamiRpc';

// create logic for getting a proposal from kami

export async function getProposalFromKami(startBlockNumber: number, bunchDepth: number) {
  if (!process.env.KAMI_URL) {
    throw new Error(
      'KAMI_URL env variable is not set. Please set the env variable for this to work'
    );
  }
  const url = new URL(process.env.KAMI_URL);

  const result = await kamiRpc(url, 'kami_initiateBunch', [startBlockNumber, bunchDepth]);
  return result;
}
