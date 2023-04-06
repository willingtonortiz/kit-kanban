<script lang="ts">
  import { createCounter } from './store';

  const count = createCounter();
</script>

<div>
  <p>Count {$count}</p>

  <button on:click={count.increment}>Increment</button>
  <button on:click={count.decrement}>Decrement</button>
  <button on:click={count.reset}>Reset</button>
</div>
