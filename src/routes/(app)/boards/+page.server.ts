import { db } from '$lib/business/core/infrastructure/database';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const userAuthToken = cookies.get('session');

  if (!userAuthToken) {
    throw redirect(303, '/login');
  }

  const user = await db.user.findUnique({ where: { userAuthToken } });
  if (!user) {
    throw redirect(303, '/login');
  }

  const boards = await db.board.findMany({ where: { ownerId: user.id } });

  return { boards };
}
