<script lang="ts">
  import { dndzone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import type { List, Task } from '../+page.server';

  const flipDurationMs = 200;
  export let initialData: List;
  let serverItems = [...initialData.Task];
  let currentItems = [...initialData.Task];

  function handleDndConsiderCards(e: CustomEvent<DndEvent<Task>>): void {
    currentItems = e.detail.items;
  }

  function handleDndFinalizeCards(e: CustomEvent<DndEvent<Task>>): void {
    currentItems = e.detail.items;

    // Check if an item was added, removed or removed
    if (currentItems.length > serverItems.length) {
      // Item was added
      const addedItem = currentItems.find((item) => !serverItems.includes(item));
      console.log(`Added item in section ${initialData.id}`, addedItem);
    } else if (currentItems.length < serverItems.length) {
      // Item was removed
      const removedItem = serverItems.find((item) => !currentItems.includes(item));
      console.log(`Removed item in section ${initialData.id}`, removedItem);
    } else {
      // Item was moved
      //   const movedItem = currentItems.find(item => item.id !== serverItems.find(serverItem => serverItem.id === item.id)?.id);
      //   console.log('Moved item: ', movedItem);
    }

    serverItems = currentItems;
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
    {#each currentItems as item (item.id)}
      <li
        class="mr-1 p-2 rounded-sm bg-white text-sm shadow-sm"
        animate:flip={{ duration: flipDurationMs }}
      >
        <p>{item.name}</p>
      </li>
    {/each}
  </ul>

  <div>bottom</div>
</div>
