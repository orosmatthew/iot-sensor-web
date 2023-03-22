import { json, type RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
  let data = await request.json();
  await prisma.counter.create({ data: { num: data.test } });
  return json({ status: 'success' });
}) satisfies RequestHandler;
