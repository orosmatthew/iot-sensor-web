import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { Temp } from '@prisma/client';

export type TempData = {
  temp: Temp[];
};

const prisma = new PrismaClient();

const MS_PER_MINUTE = 60000;

export const POST = (async ({ request }) => {
  let data = (await request.json()) as { temp: number };
  await prisma.temp.create({ data: { temp: data.temp } });
  return json({ status: 'success' });
}) satisfies RequestHandler;

export const GET = (async () => {
  let data = await prisma.temp.findMany({
    where: { createdAt: { gte: new Date(new Date().valueOf() - 20 * MS_PER_MINUTE) } }
  });
  let tempData: TempData = { temp: data };
  return json(tempData);
}) satisfies RequestHandler;
