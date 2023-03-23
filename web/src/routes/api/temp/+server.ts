import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
  let data = (await request.json()) as { temp: number };
  await prisma.temp.create({ data: { temp: data.temp } });
  return json({ status: 'success' });
}) satisfies RequestHandler;
