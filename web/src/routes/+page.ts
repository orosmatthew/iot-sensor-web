import type { PageLoad } from './$types';
import type { TempData } from './api/temp/types';

export const load = (async ({ fetch }) => {
  let res = await fetch('/api/temp/20', { method: 'GET' });
  let tempData = (await res.json()) as TempData;
  return { tempData: tempData };
}) satisfies PageLoad;
