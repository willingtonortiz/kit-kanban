import { fail } from '@sveltejs/kit';
import { ZBoardId } from '$lib/business/board/domain/board';
import { db } from '$lib/business/core/infrastructure/database';

export const load = async ({ params }) => {
  const boardId = ZBoardId.parse(params.boardId);

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw fail(404, { message: 'Board not found' });
  }

  const lists = await db.list.findMany({
    where: { boardId },
    orderBy: { order: 'asc' },
    include: { Task: { orderBy: { order: 'asc' } } },
  });

  return {
    board,
    lists: lists.map((list) => ({
      id: list.id,
      name: list.name,
      boardId: list.boardId,
      order: list.order,
      tasks: list.Task,
    })),
  };
};
