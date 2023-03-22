import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = (() => {
  let namesData = prisma.test.findMany();
  return { names: namesData };
}) satisfies PageServerLoad;
