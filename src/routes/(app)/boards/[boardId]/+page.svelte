<script lang="ts">
  import type { PageData } from './$types';
  import BoardHeader from './components/BoardHeader.svelte';
  import BoardList from './components/BoardList.svelte';

  export let data: PageData;
  let board = data.board;
  let lists = data.lists;
</script>

<div class="p-4 w-screen flex flex-col flex-nowrap overflow-y-auto">
  <BoardHeader title={board.name} />

  <div
    class="h-full flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#bfc4ce] scrollbar-track-[#dadbe2]"
  >
    <div class="mb-2 flex-1 flex flex-row flex-nowrap items-start gap-x-4">
      {#each lists as list}
        <BoardList initialData={list} />
      {/each}
    </div>
  </div>
</div>
