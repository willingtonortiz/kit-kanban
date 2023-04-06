/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writable } from 'svelte/store';
import { Map as IMap, List as IList } from 'immutable';
import type { CreateTask } from '../../../../../lib/business/board/domain/task';
import type { List, Task } from '../domain/types';

type CreateBoardStateProps = {
  boardId: string;
  lists: List[];
};

type BoardState = {
  lists: StateList;
  tasksMap: StateMap;
};
type StateMap = IMap<string, Task>;
type StateList = IList<{
  id: string;
  name: string;
  boardId: string;
  order: number;
  tasks: IList<Task>;
}>;

function createStateMap(lists: List[]): StateMap {
  return lists.reduce(
    (accu, list) => list.tasks.reduce((accu, task) => accu.set(task.id, task), accu),
    IMap<string, Task>(),
  );
}

function createStateList(lists: List[]): StateList {
  return lists.reduce(
    (accu, list) => {
      return accu.push({
        id: list.id,
        name: list.name,
        boardId: list.boardId,
        order: list.order,
        tasks: IList(list.tasks),
      });
    },
    IList<{
      id: string;
      name: string;
      boardId: string;
      order: number;
      tasks: IList<Task>;
    }>(),
  );
}

type AddTaskParams = {
  task: CreateTask;
};

type MoveTaskToListParams = {
  taskId: string;
  listId: string;
};

// TODO: Change implementation to use maps instead of lists

export function createBoardState({ lists }: CreateBoardStateProps) {
  const { subscribe, update } = writable<BoardState>({
    lists: createStateList(lists),
    tasksMap: createStateMap(lists),
  });

  function addTask({ task }: AddTaskParams) {
    const { listId } = task;

    update((state) => {
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      const updatedLists = state.lists.update(listIndex, (list) => {
        if (!list) {
          return;
        }

        return { ...list, tasks: list.tasks.push(task) };
      });
      const mapWithNewTask = state.tasksMap.set(task.id, task);

      return {
        lists: updatedLists,
        tasksMap: mapWithNewTask,
      };
    });
  }

  function moveTaskToList({ listId: newListId, taskId }: MoveTaskToListParams) {
    update((state) => {
      const oldListId = state.tasksMap.get(taskId)!.listId;
      const oldListIndex = state.lists.findIndex((list) => list.id === oldListId);
      const newListIndex = state.lists.findIndex((list) => list.id === newListId);
      const taskIndex = state.lists
        .get(oldListIndex)!
        .tasks.findIndex((task) => task.id === taskId);

      const task = state.tasksMap.get(taskId)!;
      const updatedTask = { ...task, listId: newListId };

      const updatedLists = state.lists
        .update(oldListIndex, (list) => {
          if (!list) {
            return;
          }

          return { ...list, tasks: list.tasks.delete(taskIndex) };
        })
        .update(newListIndex, (list) => {
          if (!list) {
            return;
          }

          return { ...list, tasks: list.tasks.push(updatedTask) };
        });

      const mapWithUpdatedTask = state.tasksMap.set(taskId, updatedTask);

      return {
        lists: updatedLists,
        tasksMap: mapWithUpdatedTask,
      };
    });
  }

  return { subscribe, addTask, moveTaskToList };
}
