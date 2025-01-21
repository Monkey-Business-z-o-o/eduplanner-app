// src/routes/logout/+server.ts
import { redirect, type Cookies } from '@sveltejs/kit';

export const GET = ({ cookies }: { cookies: Cookies }) => {
	cookies.delete('authtoken', { path: '/' });
	cookies.delete('username', { path: '/' });
	// Przekieruj z parametrem informującym o wylogowaniu
	throw redirect(303, '/?logout=true');
};