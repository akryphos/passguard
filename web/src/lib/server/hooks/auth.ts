import { BASE_API_URL } from '$env/static/private';
import { Routes } from '$lib/constants';
import { setCookieFromAPI } from '$lib/utils/cookies';
import type { Handle } from '@sveltejs/kit';

const hook: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === Routes.ROOT) {
		return resolve(event);
	}

	const sessionId = event.cookies.get('auth_session');
	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	try {
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
	} catch (error) {
		// @ts-ignore
		if (error instanceof Error && error.cause?.code === 'ECONNREFUSED') {
			return new Response('Failed to connect to the API server!');
		}
		// @ts-ignore
		return new Response(error);
	}
};

export default hook;
