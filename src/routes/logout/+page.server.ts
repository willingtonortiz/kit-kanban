import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
  throw redirect(302, '/boards');
};

export const actions: Actions = {
  default({ cookies }) {
    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    });

    throw redirect(302, '/login');
  },
};
