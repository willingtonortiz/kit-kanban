<script lang="ts">
  import Center from '$lib/app/shared/components/atoms/Center.svelte';
  import Button from '$lib/app/shared/components/atoms/Button.svelte';

  export let title = '';
</script>

<Center>
  <div class="flex flex-col items-center">
    <h1>{title} was not found</h1>

    <Button on:click>Return</Button>
  </div>
</Center>
