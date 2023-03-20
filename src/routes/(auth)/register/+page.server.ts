import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action, Actions } from './$types';

export const load: PageServerLoad = async () => {
  return { hello: 'world' };
};

const ZRegister = z
  .object({
    username: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
  });

const register: Action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const parseResult = ZRegister.safeParse(data);
  if (!parseResult.success) {
    const { fieldErrors, formErrors } = parseResult.error.flatten();

    return fail(400, { fieldErrors, formErrors });
  }

  const { username, password, confirmPassword } = parseResult.data;
  throw redirect(303, '/login');
};

export const actions: Actions = { register };
