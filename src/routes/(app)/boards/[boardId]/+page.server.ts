import { randUuid, randProductName } from '@ngneat/falso';
import type { PageServerLoad } from './$types';
import { ZBoardId } from '$lib/business/board/domain/board';

export const load: PageServerLoad = async ({ params }) => {
  const boardId = ZBoardId.parse(params.boardId);

  console.log(boardId);

  return { id: randUuid(), name: randProductName() };
};
