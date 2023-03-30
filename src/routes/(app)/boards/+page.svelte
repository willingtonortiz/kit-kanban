<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="h-full px-8 pt-8 flex flex-row flex-nowrap gap-4">
  <nav class="min-w-[200px]">
    <ul class="grid grid-rows-3 gap-y-2 text-sm font-bold text-primary">
      <li>
        <a
          href="/boards"
          class="h-[32px] p-1 flex flex-row flex-nowrap items-center gap-2 bg-lightblue rounded-sm hover:bg-gray-200"
        >
          <div class="w-4 h-4" />

          <h3>Tableros</h3>
        </a>
      </li>

      <li>
        <a
          href="/boards"
          class="h-[32px] p-1 flex flex-row flex-nowrap items-center gap-2 bg-lightblue rounded-sm hover:bg-gray-200"
        >
          <div class="w-4 h-4" />

          <h3>Plantillas</h3>
        </a>
      </li>

      <li>
        <a
          href="/boards"
          class="h-[32px] p-1 flex flex-row flex-nowrap items-center gap-2 bg-lightblue rounded-sm hover:bg-gray-200"
        >
          <div class="w-4 h-4" />

          <h3>Inicio</h3>
        </a>
      </li>
    </ul>
  </nav>

  <div class="flex flex-row flex-wrap gap-3 justify-start content-start items-start">
    {#each data.boards as board}
      <a href="/boards/{board.id}" class="w-[200px] h-24 p-2 rounded-sm bg-red-300">
        <h3 class="text-white font-bold">{board.name}</h3>
      </a>
    {/each}

    <a
      data-sveltekit-preload-data="off"
      href="/boards/new"
      class="w-[200px] h-24 p-2 bg-appgray text-textgray rounded-sm"
    >
      Crear un tablero nuevo
    </a>
  </div>
</div>
