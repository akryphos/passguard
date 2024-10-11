import { BASE_API_URL } from '$env/static/private';
import { setCookieFromAPI } from '$lib/utils/cookies';
import type { Handle } from '@sveltejs/kit';

export const auth_hook: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('auth_session');
	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	const res = await event.fetch(`${BASE_API_URL}/auth/validate_session`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionId}`
		}
	});

	if (!res.ok) {
		setCookieFromAPI(res, event.cookies);
        event.locals.user = null;
        return resolve(event);
	}

	let user = await res.json();
	event.locals.user = user;

	return resolve(event);
};
