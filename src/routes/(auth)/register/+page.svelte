<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/app/shared/components/atoms/Button.svelte';
  import FieldErrors from '$lib/app/shared/components/atoms/FieldErrors.svelte';
  import { isDevelopment } from '$lib/app/core/environment';
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form
  action="?/register"
  method="POST"
  class="w-full flex flex-col items-center gap-y-4"
  use:enhance
>
  <h1 class="text-2xl">Register</h1>

  <div class="w-full flex flex-col">
    <label for="username">Username</label>
    <input
      class="border focus:border-2 border-blue-600 px-2 py-1 outline-none"
      type="text"
      id="username"
      name="username"
      value={isDevelopment ? 'willingtonortiz' : ''}
    />
    <FieldErrors errors={form?.fieldErrors?.username} />
  </div>

  <div class="w-full flex flex-col">
    <label for="password">Password</label>
    <input
      class="border focus:border-2 border-blue-600 px-2 py-1 outline-none"
      type="password"
      id="password"
      name="password"
      value={isDevelopment ? 'password' : ''}
    />
    <FieldErrors errors={form?.fieldErrors?.password} />
  </div>

  <div class="w-full flex flex-col">
    <label for="confirmPassword">Confirm Password</label>
    <input
      class="border focus:border-2 border-blue-600 px-2 py-1 outline-none"
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      value={isDevelopment ? 'password' : ''}
    />
    <FieldErrors errors={form?.fieldErrors?.confirmPassword} />
  </div>

  <Button type="submit">Register</Button>

  <FieldErrors errors={form?.formErrors} />
</form>
