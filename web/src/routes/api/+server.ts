import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
  let data = await request.json();
  console.log(data);
  return json({ status: 'success' });
}) satisfies RequestHandler;
