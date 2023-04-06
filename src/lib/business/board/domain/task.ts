import { z } from 'zod';
import { ZListId } from './list';

export const TaskId = z.string().uuid();

export const ZCreateTask = z.object({
  id: TaskId,
  name: z.string().min(1).max(100),
  order: z.number().min(0),
  listId: ZListId,
});

export type CreateTask = z.infer<typeof ZCreateTask>;
