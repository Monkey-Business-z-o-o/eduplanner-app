import type { Cookies } from '@sveltejs/kit';

export function load({ cookies }: { cookies: Cookies }) {
	const authtoken = cookies.get('authtoken');
	const username = cookies.get('username');
	return {
		authtoken,
		username
	};
}