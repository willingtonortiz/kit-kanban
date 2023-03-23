<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>{data.board.id}</h1>

<h2>{data.board.name}</h2>
