import {
  getContainer,
  CONTAINERS,
  type UserDocument,
  type StepProgressDocument,
  type InventoryDocument,
  type AmendDocument,
  type DailyEntryDocument,
  type AwakeningDocument,
  type SobrietyDocument,
} from './cosmos';

const DEFAULT_USER_ID = 'default-user'; // For single-user app

// User operations
export async function getUser(userId: string = DEFAULT_USER_ID): Promise<UserDocument | null> {
  try {
    const container = await getContainer(CONTAINERS.USERS);
    const { resource } = await container.item(userId, userId).read<UserDocument>();
    return resource || null;
  } catch (error) {
    if ((error as any).code === 404) return null;
    throw error;
  }
}

export async function upsertUser(userData: Partial<UserDocument>, userId: string = DEFAULT_USER_ID): Promise<UserDocument> {
  const container = await getContainer(CONTAINERS.USERS);
  const now = new Date().toISOString();

  const existing = await getUser(userId);
  const document: UserDocument = {
    id: userId,
    userId,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    ...userData,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

// Step Progress operations
export async function getStepProgress(userId: string = DEFAULT_USER_ID): Promise<StepProgressDocument[]> {
  const container = await getContainer(CONTAINERS.STEP_PROGRESS);
  const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.stepNumber',
      parameters: [{ name: '@userId', value: userId }],
    })
    .fetchAll();
  return resources as any;
}

export async function updateStepProgress(
  stepNumber: number,
  completed: boolean,
  userId: string = DEFAULT_USER_ID
): Promise<StepProgressDocument> {
  const container = await getContainer(CONTAINERS.STEP_PROGRESS);
  const now = new Date().toISOString();
  const id = `step-${stepNumber}-${userId}`;

  const document: StepProgressDocument = {
    id,
    userId,
    stepNumber,
    completed,
    completedAt: completed ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

// Inventory operations
export async function saveInventory(
  stepNumber: number,
  type: InventoryDocument['type'],
  data: any,
  userId: string = DEFAULT_USER_ID
): Promise<InventoryDocument> {
  const container = await getContainer(CONTAINERS.INVENTORIES);
  const now = new Date().toISOString();
  const id = `${stepNumber}-${type}-${Date.now()}`;

  const document: InventoryDocument = {
    id,
    userId,
    stepNumber,
    type,
    data,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

export async function getInventories(
  stepNumber: number,
  type?: InventoryDocument['type'],
  userId: string = DEFAULT_USER_ID
): Promise<InventoryDocument[]> {
  const container = await getContainer(CONTAINERS.INVENTORIES);
  const query = type
    ? 'SELECT * FROM c WHERE c.userId = @userId AND c.stepNumber = @stepNumber AND c.type = @type ORDER BY c.createdAt DESC'
    : 'SELECT * FROM c WHERE c.userId = @userId AND c.stepNumber = @stepNumber ORDER BY c.createdAt DESC';

  const parameters = type
    ? [
        { name: '@userId', value: userId },
        { name: '@stepNumber', value: stepNumber },
        { name: '@type', value: type },
      ]
    : [
        { name: '@userId', value: userId },
        { name: '@stepNumber', value: stepNumber },
      ];

  const { resources } = await container.items.query({ query, parameters }).fetchAll();
  return resources as any;
}

// Amends operations
export async function saveAmend(amendData: Omit<AmendDocument, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, userId: string = DEFAULT_USER_ID): Promise<AmendDocument> {
  const container = await getContainer(CONTAINERS.AMENDS);
  const now = new Date().toISOString();
  const id = `amend-${Date.now()}`;

  const document: AmendDocument = {
    id,
    userId,
    ...amendData,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

export async function getAmends(userId: string = DEFAULT_USER_ID): Promise<AmendDocument[]> {
  const container = await getContainer(CONTAINERS.AMENDS);
  const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.createdAt DESC',
      parameters: [{ name: '@userId', value: userId }],
    })
    .fetchAll();
  return resources as any;
}

// Daily Entry operations
export async function saveDailyEntry(
  stepNumber: number,
  date: string,
  content: any,
  userId: string = DEFAULT_USER_ID
): Promise<DailyEntryDocument> {
  const container = await getContainer(CONTAINERS.DAILY_ENTRIES);
  const now = new Date().toISOString();
  const id = `step-${stepNumber}-${date}-${userId}`;

  const document: DailyEntryDocument = {
    id,
    userId,
    stepNumber,
    date,
    content,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

export async function getDailyEntries(
  stepNumber: number,
  userId: string = DEFAULT_USER_ID
): Promise<DailyEntryDocument[]> {
  const container = await getContainer(CONTAINERS.DAILY_ENTRIES);
  const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.userId = @userId AND c.stepNumber = @stepNumber ORDER BY c.date DESC',
      parameters: [
        { name: '@userId', value: userId },
        { name: '@stepNumber', value: stepNumber },
      ],
    })
    .fetchAll();
  return resources as any;
}

// Awakening operations
export async function saveAwakening(awakeningData: Omit<AwakeningDocument, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, userId: string = DEFAULT_USER_ID): Promise<AwakeningDocument> {
  const container = await getContainer(CONTAINERS.AWAKENINGS);
  const now = new Date().toISOString();
  const id = `awakening-${awakeningData.date}-${userId}`;

  const document: AwakeningDocument = {
    id,
    userId,
    ...awakeningData,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}

export async function getAwakenings(userId: string = DEFAULT_USER_ID): Promise<AwakeningDocument[]> {
  const container = await getContainer(CONTAINERS.AWAKENINGS);
  const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.date DESC',
      parameters: [{ name: '@userId', value: userId }],
    })
    .fetchAll();
  return resources as any;
}

// Sobriety operations
export async function getSobrietyData(userId: string = DEFAULT_USER_ID): Promise<SobrietyDocument | null> {
  try {
    const container = await getContainer(CONTAINERS.SOBRIETY);
    const id = `sobriety-${userId}`;
    const { resource } = await container.item(id, userId).read<SobrietyDocument>();
    return resource || null;
  } catch (error) {
    if ((error as any).code === 404) return null;
    throw error;
  }
}

export async function updateSobrietyData(
  startDate: string,
  userId: string = DEFAULT_USER_ID
): Promise<SobrietyDocument> {
  const container = await getContainer(CONTAINERS.SOBRIETY);
  const now = new Date().toISOString();
  const id = `sobriety-${userId}`;

  const start = new Date(startDate);
  const today = new Date();
  const daysClean = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const document: SobrietyDocument = {
    id,
    userId,
    startDate,
    lastCheckin: now,
    daysClean,
    createdAt: now,
    updatedAt: now,
  };

  const { resource } = await container.items.upsert(document);
  return resource as any;
}
