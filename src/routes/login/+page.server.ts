import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const login = formData.get('login');
        const password = formData.get('password');

        console.log('Form Data:', { login, password });

        try {
            const response = await fetch('https://backend.kebson.fun/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ login: login, password: password }),
            });

            console.log('Request sent:', { login, password });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Set the auth token
                cookies.set('authtoken', data.token, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                });

                // Set the username cookie
                cookies.set('username', login as string, {
                    path: '/',
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                });

                throw redirect(303, '/');
            } else {
                const errorText = await response.text();
                console.error('Login failed:', errorText);
                cookies.delete('authtoken', { path: '/' });
                cookies.delete('username', { path: '/' });
                return fail(401, { message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return fail(500, { message: 'Internal server error' });
        }
    },
} satisfies Actions;
