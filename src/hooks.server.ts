import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/business/core/infrastructure/database';

export const handle: Handle = async ({ event, resolve }) => {
  const userAuthToken = event.cookies.get('session');

  if (!userAuthToken) {
    return await resolve(event);
  }

  const user = await db.user.findUnique({
    where: { userAuthToken },
    select: { username: true, role: true },
  });

  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.name,
    };
  }

  return await resolve(event);
};
