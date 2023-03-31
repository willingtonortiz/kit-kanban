<script lang="ts">
  export let data;
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
      <a href="/boards/{board.id}" class="w-[200px] h-24 rounded-sm overflow-hidden grid">
        <img
          class="col-start-1 col-end-1 row-start-1 row-end-1 w-full h-full brightness-75 z-0"
          alt={board.name}
          src={board.imageUrl}
        />

        <div class="p-2 col-start-1 col-end-1 row-start-1 row-end-1 z-10">
          <h3 class="text-white font-bold">{board.name}</h3>
        </div>
      </a>
    {/each}

    <a
      data-sveltekit-preload-data="off"
      href="/boards/new"
      class="w-[200px] h-24 p-2 grid place-items-center bg-appgray text-textgray rounded-sm"
    >
      <p>Crear un tablero nuevo</p>
    </a>
  </div>
</div>
