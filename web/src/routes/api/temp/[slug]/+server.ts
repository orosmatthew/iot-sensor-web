import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { TempData } from '../types';

const prisma = new PrismaClient();

const MS_PER_MINUTE = 60000;

export const GET = (async ({ params }) => {
  let minutes = parseInt(params.slug);
  if (isNaN(minutes)) {
    throw error(400, 'invalid');
  }
  let data = await prisma.temp.findMany({
    where: { createdAt: { gte: new Date(new Date().valueOf() - minutes * MS_PER_MINUTE) } }
  });
  let tempData: TempData = { temp: data };
  return json(tempData);
}) satisfies RequestHandler;
