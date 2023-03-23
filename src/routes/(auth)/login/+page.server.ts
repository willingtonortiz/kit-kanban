import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { db } from '$lib/business/core/infrastructure/database';
import type { Action, Actions, PageServerLoad } from './$types';

const ZLogin = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/boards');
  }
};

const login: Action = async ({ request, cookies }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const parseResult = ZLogin.safeParse(data);
  if (!parseResult.success) {
    const { fieldErrors, formErrors } = parseResult.error.flatten();

    return fail(400, { fieldErrors, formErrors });
  }

  const { username, password } = parseResult.data;

  const foundUser = await db.user.findUnique({ where: { username } });
  if (!foundUser) {
    return fail(400, {
      formErrors: ['User not found'],
    });
  }

  if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
    return fail(400, {
      formErrors: ['Incorrect credentials'],
    });
  }

  const authenticatedUser = await db.user.update({
    where: { id: foundUser.id },
    data: {
      userAuthToken: crypto.randomUUID(),
    },
  });

  cookies.set('session', authenticatedUser.userAuthToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });

  throw redirect(303, '/boards');
};

export const actions: Actions = { login };
