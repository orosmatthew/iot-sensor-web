import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { Temp } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
  let data = (await request.json()) as { temp: number };
  await prisma.temp.create({ data: { temp: data.temp } });
  return json({ status: 'success' });
}) satisfies RequestHandler;

const MS_PER_MINUTE = 60000;

export type TempData = {
  temp: Temp[];
};

export const GET = (async () => {
  let data = await prisma.temp.findMany({
    where: { createdAt: { gte: new Date(new Date().valueOf() - 20 * MS_PER_MINUTE) } }
  });
  let tempData: TempData = { temp: data };
  return json(tempData);
}) satisfies RequestHandler;
