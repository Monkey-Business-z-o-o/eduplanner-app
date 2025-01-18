import type { Cookies } from '@sveltejs/kit';

export function load({ cookies }: { cookies: Cookies }) {
	const authtoken = cookies.get('authtoken');
	return {
		authtoken
	};
}