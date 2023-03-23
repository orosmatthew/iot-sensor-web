import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MS_PER_MINUTE = 60000;

export const load = (() => {
  let tempData = prisma.temp.findMany({
    where: { createdAt: { gte: new Date(new Date().valueOf() - 20 * MS_PER_MINUTE) } }
  });
  return { temp: tempData };
}) satisfies PageServerLoad;
