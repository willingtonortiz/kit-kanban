<script lang="ts">
  import { v4 as uuidv4 } from '@lukeed/uuid';
  import PrintJson from '../../../../lib/app/shared/components/atoms/PrintJson.svelte';
  import type { PageData } from './$types';
  import BoardHeader from './components/BoardHeader.svelte';
  import BoardList from './components/BoardList.svelte';
  import { createBoardState } from './stores/store';

  export let data: PageData;
  let board = data.board;
  let lists = data.lists;

  const boardState = createBoardState({ boardId: board.id, lists });

  function onAddTask(event: CustomEvent<{ name: string; listId: string }>) {
    const { name, listId } = event.detail;

    boardState.addTask({ task: { id: uuidv4(), name, listId, order: Math.random() * 10000 } });
  }

  function onMoveTaskToList(event: CustomEvent<{ listId: string; taskId: string }>) {
    const { taskId, listId } = event.detail;

    boardState.moveTaskToList({ taskId, listId });
  }

  function onTaskClicked(event: CustomEvent<{ taskId: string }>) {
    const { taskId } = event.detail;

    console.log('Task clicked', taskId);
  }
</script>

<div class="p-4 w-screen flex flex-col flex-nowrap overflow-y-auto">
  <BoardHeader title={board.name} />

  <div
    class="h-full flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#bfc4ce] scrollbar-track-[#dadbe2]"
  >
    <div class="mb-2 flex-1 flex flex-row flex-nowrap items-start gap-x-4">
      {#each $boardState.lists.toArray() as list}
        <!-- TODO: Change this; Split database data from frontend(state) data -->
        <BoardList
          initialData={{ ...list, Task: list.tasks.toArray() }}
          on:taskClicked={onTaskClicked}
          on:addTask={onAddTask}
          on:moveTaskToList={onMoveTaskToList}
        />
      {/each}
    </div>
  </div>
</div>

<PrintJson class="max-h-96" json={$boardState} />
