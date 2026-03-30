import { Pinecone } from '@pinecone-database/pinecone';

const key = process.env.PINECONE_API_KEY;

export const pinecone = key
  ? new Pinecone({ apiKey: key })
  : null;
