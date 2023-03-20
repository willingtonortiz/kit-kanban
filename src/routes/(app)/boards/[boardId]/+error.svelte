<script lang="ts">
  import NotFoundPage from '$lib/app/shared/components/pages/NotFoundPage.svelte';
  import { goto } from '$app/navigation';

  function onReturn() {
    goto('/boards');
  }
</script>

<NotFoundPage title={'Board'} on:click={onReturn} />
