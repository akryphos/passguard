import { BASE_API_URL } from '$env/static/private';
import { Routes } from '$lib/constants.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const sessionId = cookies.get('auth_session');

	// Prevent hitting api each time, someone tries to goto 'app_url/logout'
	// even without being authenticated
	if (!sessionId) {
		throw redirect(302, Routes.LOGIN);
	}
};

export const actions = {
	default: async ({ cookies, fetch }) => {
		const sessionId = cookies.get('auth_session');

		const res = await fetch(`${BASE_API_URL}/auth/logout`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${sessionId}`
			}
		});

		if (res.ok) {
			cookies.set('auth_session', '', {
				path: '/'
			});

			throw redirect(301, Routes.LOGIN);
		} else {
			return new Response(await res.text());
		}
	}
};
