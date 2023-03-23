<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Board list</h1>

{#each data.boards as board}
  <div>
    <a href="/boards/{board.id}">{board.name}</a>
  </div>
{/each}
