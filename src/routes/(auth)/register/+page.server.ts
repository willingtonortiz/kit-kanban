import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/business/core/infrastructure/database';

const ZRegister = z
  .object({
    username: z.string().min(3).max(20),
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

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/boards');
  }
};

const register: Action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const parseResult = ZRegister.safeParse(data);
  if (!parseResult.success) {
    const { fieldErrors, formErrors } = parseResult.error.flatten();

    return fail(400, { fieldErrors, formErrors });
  }

  const { username, password } = parseResult.data;

  const foundUser = await db.user.findUnique({ where: { username } });
  if (foundUser) {
    return fail(400, {
      formErrors: ['User already exists'],
    });
  }

  await db.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: {
        connect: { name: 'USER' },
      },
    },
  });

  throw redirect(303, '/login');
};

export const actions: Actions = { register };
