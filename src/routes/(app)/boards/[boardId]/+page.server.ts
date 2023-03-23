import type { PageServerLoad } from './$types';
import { ZBoardId } from '$lib/business/board/domain/board';
import { db } from '$lib/business/core/infrastructure/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const boardId = ZBoardId.parse(params.boardId);

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw fail(404, { message: 'Board not found' });
  }

  return { board };
};
