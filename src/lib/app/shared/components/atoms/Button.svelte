<script lang="ts">
  import Spinner from './Spinner.svelte';

  export let isLoading = false;

  // TODO: Check for svelte typing
  export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
</script>

<button
  class={'px-4 py-1.5 bg-primary rounded-sm w-min flex flex-row items-center gap-x-2 cursor-pointer text-white disabled:cursor-not-allowed'}
  {type}
  disabled={isLoading}
  on:click
>
  {#if $$slots.left}
    <slot name="left" />
  {/if}

  <slot />

  {#if $$slots.right}
    <slot name="right" />
  {/if}

  {#if isLoading}
    <Spinner className="animate-spin fill-gray-500" />
  {/if}
</button>
