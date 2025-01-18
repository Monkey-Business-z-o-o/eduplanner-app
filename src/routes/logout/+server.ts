// src/routes/logout/+server.ts
import { redirect, type Cookies } from '@sveltejs/kit';

export const GET = ({ cookies }: { cookies: Cookies }) => {
	cookies.delete('authtoken', { path: '/' });
	throw redirect(303, '/');
};