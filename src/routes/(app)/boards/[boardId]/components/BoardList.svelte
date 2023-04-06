<script lang="ts">
  import { dndzone, type DndEvent } from 'svelte-dnd-action';
  import { createEventDispatcher } from 'svelte';
  import { flip } from 'svelte/animate';
  import type { List, Task } from '../+page.server';
  import AddTask from './AddTask.svelte';

  const dispatch = createEventDispatcher();

  const flipDurationMs = 200;
  export let initialData: List;
  $: serverItems = [...initialData.Task];
  $: currentItems = [...initialData.Task];

  function handleDndConsiderCards(e: CustomEvent<DndEvent<Task>>): void {
    currentItems = e.detail.items;
  }

  function handleDndFinalizeCards(e: CustomEvent<DndEvent<Task>>): void {
    currentItems = e.detail.items;

    // Check if an item was added, removed or removed
    if (currentItems.length > serverItems.length) {
      // Item was added to list
      const movedTask = currentItems.find((item) => !serverItems.includes(item));
      dispatch('moveTaskToList', { taskId: movedTask?.id, listId: initialData.id });
    } else if (currentItems.length === serverItems.length) {
      // Item was reordered
      // TODO: Implement this
    }

    serverItems = currentItems;
  }

  function onAddTask(event: CustomEvent<string>) {
    const taskName = event.detail;
    dispatch('addTask', { name: taskName, listId: initialData.id });
  }

  function onTaskClicked(taskId: string) {
    dispatch('taskClicked', { taskId });
  }
</script>

<div
  class="py-2 pl-2 pr-1 min-w-[272px] w-[272px] max-h-full flex flex-col flex-nowrap gap-y-2 bg-[#ebecf0] rounded-sm"
>
  <h1>{initialData.name}</h1>

  <ul
    class="min-h-[1rem] flex-1 flex flex-col flex-nowrap gap-2 scrollbar-thin scrollbar-thumb-[#bfc4ce] scrollbar-track-[#dadbe2] overflow-y-auto"
    use:dndzone={{
      items: currentItems,
      flipDurationMs,
      dropTargetClasses: ['outline-transparent'],
      dropTargetStyle: { outline: 'none' },
    }}
    on:consider={handleDndConsiderCards}
    on:finalize={handleDndFinalizeCards}
  >
    {#each currentItems as task (task.id)}
      <li class="flex" animate:flip={{ duration: flipDurationMs }}>
        <button
          class="mr-1 p-2 flex-1 rounded-sm bg-white text-sm shadow-sm"
          on:click={() => onTaskClicked(task.id)}
        >
          <p>{task.name}</p>
        </button>
      </li>
    {/each}
  </ul>

  <AddTask on:addTask={onAddTask} />
</div>
