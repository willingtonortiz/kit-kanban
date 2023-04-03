import { ZBoardId } from '$lib/business/board/domain/board';
import { db } from '$lib/business/core/infrastructure/database';
import { fail } from '@sveltejs/kit';

export type List = {
  id: string;
  name: string;
  order: number;
  boardId: string;
  Task: Task[];
};

export type Task = {
  id: string;
  name: string;
  order: number;
  listId: string;
};

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
    include: { Task: true },
  });

  return {
    board,
    lists,
  };
};
