<script lang="ts">
  import clsx from 'clsx';

  export let json: unknown;
</script>

<pre class={clsx('overflow-y-auto', $$props.class)}>
	{JSON.stringify(json, null, 2)}
</pre>
