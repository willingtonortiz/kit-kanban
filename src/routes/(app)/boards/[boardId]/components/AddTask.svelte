<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import AddIcon from '../../../../../lib/app/shared/components/atoms/icons/AddIcon.svelte';
  import CloseIcon from '../../../../../lib/app/shared/components/atoms/icons/CloseIcon.svelte';

  const dispatch = createEventDispatcher();

  let isAdding = false;
  let textValue = '';

  function showAddTaskForm() {
    isAdding = true;
  }

  function closeAddTaskForm() {
    isAdding = false;
  }

  function onInputBlur() {
    if (textValue === '') {
      isAdding = false;
      return;
    }
  }

  // TODO: Fix only for enter key
  function onInput(e: any) {
    const event = e as InputEvent;

    if (event.inputType === 'insertLineBreak') {
      addTask();
    }
  }

  function addTask() {
    if (textValue === '') {
      isAdding = false;
      return;
    }

    // Submit event
    dispatch('addTask', textValue.trim());
    textValue = '';
    isAdding = false;
  }
</script>

<div class="mr-1">
  {#if !isAdding}
    <button
      class="px-2 py-1 w-full flex flex-row flex-nowrap items-center gap-x-1 text-sm text-[#5e6c84] hover:bg-[#dadbe2] rounded-sm"
      on:click={showAddTaskForm}
    >
      <AddIcon class={'text-lg'} /> Añada una tarjeta
    </button>
  {:else}
    <div class="flex flex-col flex-nowrap gap-y-2">
      <!-- svelte-ignore a11y-autofocus -->
      <textarea
        class="p-2 text-sm rounded-sm break-words resize-none outline-transparent overflow-y-auto"
        rows={3}
        autofocus
        placeholder="Introduzca un título para esta tarjeta..."
        bind:value={textValue}
        on:input={onInput}
        on:blur={onInputBlur}
      />

      <div class="flex flex-row flex-nowrap gap-x-2">
        <button
          class="px-3 py-1.5 rounded-sm bg-[#026aa7] text-sm text-white cursor-pointer"
          on:click={addTask}
        >
          Añadir tarjeta
        </button>

        <button on:click={closeAddTaskForm}>
          <CloseIcon class="text-2xl text-[#5e6c84] cursor-pointer" />
        </button>
      </div>
    </div>
  {/if}
</div>
