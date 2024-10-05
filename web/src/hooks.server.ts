import { CONST } from '$lib/constants';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('auth_session');

	if (session) {
		const res = await fetch(`${CONST.BASE_API_URL}/auth/validate_session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session}`
			}
		});

		if (res.ok) {
			const user = await res.json();
			event.locals.user = user;
		} else {
			event.cookies.delete('auth_session', { path: '/' });
		}
	}

	return resolve(event);
}
