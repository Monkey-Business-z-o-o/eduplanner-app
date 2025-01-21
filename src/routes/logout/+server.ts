// src/routes/logout/+server.ts
import { redirect, type Cookies } from '@sveltejs/kit';

export const GET = ({ cookies }: { cookies: Cookies }) => {
	cookies.delete('authtoken', { path: '/' });
	cookies.delete('username', { path: '/' });
	cookies.delete('savedLogin', { path: '/' });
	throw redirect(303, '/login?logout=true');
};