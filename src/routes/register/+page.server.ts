import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
 login: async ({ request, cookies }) => {
  const formData = await request.formData();
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const login = formData.get('login');
  const password = formData.get('password');
  const remember = formData.get('remember') === 'on';

  try {
   const response = await fetch('https://backend.kebson.fun/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, login, password }),
   });

   if (response.ok) {
    const data = await response.json();

    if (remember) {
     cookies.set('savedLogin', login as string, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false
     });
    }

    throw redirect(303, '/login?registered=true');
   } else {
    const errorData = await response.json().catch(() => ({ message: 'Błąd rejestracji' }));
    if (errorData.message === 'User already exists') {
     return fail(400, {
      message: 'Użytkownik o podanym loginie już istnieje',
      firstName: firstName as string,
      lastName: lastName as string,
      login: login as string
     });
    }
    return fail(400, {
     message: errorData.message || 'Błąd rejestracji',
     firstName: firstName as string,
     lastName: lastName as string,
     login: login as string
    });
   }
  } catch (error) {
   if (error instanceof Error && error.message.includes('redirect')) {
    throw error;
   }
   return fail(500, {
    message: 'Błąd serwera',
    firstName: firstName as string,
    lastName: lastName as string,
    login: login as string
   });
  }
 },
} satisfies Actions;