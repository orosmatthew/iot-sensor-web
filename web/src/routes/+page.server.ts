import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MS_PER_MINUTE = 60000;

export const load = (() => {
  let distanceData = prisma.distance.findMany({
    where: { createdAt: { gte: new Date(new Date().valueOf() - 1 * MS_PER_MINUTE) } }
  });
  return { distance: distanceData };
}) satisfies PageServerLoad;
