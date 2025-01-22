import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const login = formData.get('login');
        const password = formData.get('password');

        console.log('Dane formularza:', { login, password });

        try {
            const response = await fetch('https://backend.kebson.fun/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ login: login, password: password }),
            });

            console.log('Wysłano żądanie:', { login, password });

            if (response.ok) {
                const data = await response.json();
                console.log('Logowanie udane:', data);

                // Ustawienie tokena autoryzacyjnego
                cookies.set('authtoken', data.token, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                });

                // Ustawienie ciasteczka z nazwą użytkownika
                cookies.set('username', login as string, {
                    path: '/',
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                });

                // Przekierowanie na stronę główną (lub inną stronę)
                throw redirect(303, '/');
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Nieprawidłowe dane logowania' }));
                console.error('Logowanie nieudane:', errorData.message);
                cookies.delete('authtoken', { path: '/' });
                cookies.delete('username', { path: '/' });

                if (errorData.message === 'User not found') {
                    return fail(401, { message: 'użytkownik nieznany' });
                }

                return fail(401, { message: errorData.message || 'Nieprawidłowe dane logowania' });
            }
        } catch (error) {
            console.error('Błąd podczas logowania:', error);
            return fail(500, { message: 'Błąd serwera wewnętrznego' });
        }
    },
} satisfies Actions;