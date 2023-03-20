<script lang="ts">
  export let errors: string[] | undefined;
</script>

{#if errors}
  {#each errors as error}
    <p>{error}</p>
  {/each}
{/if}
