import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const login = formData.get('login');
		const password = formData.get('password');

		const response = await fetch('https://backend.kebson.fun/register', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ firstName: firstName, lastName: lastName, login: login, password: password }),
		});

		if (response.ok) {
			const data = await response.json();

			// Set the cookie with the token
			cookies.set('authtoken', data.token, {
				path: '/',
				httpOnly: true, // Ensures the cookie isn't accessible via JavaScript
				secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
				maxAge: 60 * 60 * 24 * 7, // 1 week expiration
			});
			return { success: true };
		} else {
			// Handle failed login (optional)
			cookies.delete('authtoken', { path: '/' });
			return fail(401, { message: 'Invalid credentials' });
		}
	},
} satisfies Actions;