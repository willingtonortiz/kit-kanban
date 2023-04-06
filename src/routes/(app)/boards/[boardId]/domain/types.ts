export type List = {
  id: string;
  name: string;
  order: number;
  boardId: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  order: number;
  listId: string;
};
