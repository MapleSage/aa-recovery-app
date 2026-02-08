import { CosmosClient, Database, Container } from '@azure/cosmos';

const endpoint = process.env.COSMOS_ENDPOINT || '';
const key = process.env.COSMOS_KEY || '';
const databaseId = process.env.COSMOS_DATABASE || 'aa-recovery';

let client: CosmosClient | null = null;
let database: Database | null = null;

export function getCosmosClient(): CosmosClient {
  if (!client) {
    if (!endpoint || !key) {
      throw new Error('Azure Cosmos DB credentials not configured');
    }
    client = new CosmosClient({ endpoint, key });
  }
  return client;
}

export async function getDatabase(): Promise<Database> {
  if (!database) {
    const client = getCosmosClient();
    const { database: db } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    database = db;
  }
  return database;
}

export async function getContainer(containerId: string): Promise<Container> {
  const db = await getDatabase();
  const { container } = await db.containers.createIfNotExists({
    id: containerId,
    partitionKey: { paths: ['/userId'] },
  });
  return container;
}

// Container names
export const CONTAINERS = {
  USERS: 'users',
  STEP_PROGRESS: 'step-progress',
  INVENTORIES: 'inventories',
  AMENDS: 'amends',
  DAILY_ENTRIES: 'daily-entries',
  AWAKENINGS: 'awakenings',
  SOBRIETY: 'sobriety',
} as const;

// Types for Cosmos DB documents
export interface CosmosDocument {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDocument extends CosmosDocument {
  email?: string;
  phone?: string;
  name?: string;
  sobrietyDate?: string;
}

export interface StepProgressDocument extends CosmosDocument {
  stepNumber: number;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface InventoryDocument extends CosmosDocument {
  stepNumber: number;
  type: 'resentment' | 'fear' | 'harms' | 'sex-conduct';
  data: any;
}

export interface AmendDocument extends CosmosDocument {
  person: string;
  wrong: string;
  willing: 'yes' | 'no' | 'maybe';
  status: 'pending' | 'completed';
  completedAt?: string;
}

export interface DailyEntryDocument extends CosmosDocument {
  stepNumber: number;
  date: string;
  content: any;
}

export interface AwakeningDocument extends CosmosDocument {
  date: string;
  gratitudeList: string[];
  fears: string[];
  resentments: string[];
  notes?: string;
}

export interface SobrietyDocument extends CosmosDocument {
  startDate: string;
  lastCheckin: string;
  daysClean: number;
}
