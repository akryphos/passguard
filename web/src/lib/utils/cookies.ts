import type { Cookies } from '@sveltejs/kit';
import cookie from 'cookie';

export function setCookieFromAPI(response: Response, cookies: Cookies) {
	const cookieHeader = response.headers.get('set-cookie');

	if (!cookieHeader) {
		return false;
	}

	try {
		const cookieValues = cookie.parse(cookieHeader || '');

		if (cookieValues.auth_session) {
			// Parse and store the cookie in the SvelteKit cookie storage
			cookies.set('auth_session', cookieValues.auth_session, {
				path: '/', // Set cookie for the entire site
				sameSite: 'strict' // Prevent CSRF
			});
			return true;
		} else {
			cookies.set('auth_session', '', {
				path: '/', // Set cookie for the entire site
				sameSite: 'strict' // Prevent CSRF
			});
			return false;
		}
	} catch (error) {
		return false;
	}
}
