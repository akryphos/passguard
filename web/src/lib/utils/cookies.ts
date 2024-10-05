import type { Cookies } from '@sveltejs/kit';
import cookie from 'cookie';

export function setCookieFromAPI(response: Response, cookies: Cookies) {
	const cookieHeader = response.headers.get('set-cookie');

	if (!cookieHeader) {
		return console.error('No set-cookie header found in API response');
	}

	try {
		const cookieValues = cookie.parse(cookieHeader || '');

		if (cookieValues.auth_session) {
			// Parse and store the cookie in the SvelteKit cookie storage
			cookies.set('auth_session', cookieValues.auth_session, {
				httpOnly: true, // Secure it on the server
				path: '/', // Set cookie for the entire site
				sameSite: 'strict', // Prevent CSRF
				secure: process.env.NODE_ENV === 'production' // Only use HTTPS in production
			});
		} else {
			console.error('auth_session cookie not found');
		}
	} catch (error) {
		console.error('Filed to parse cookie: ', error);
	}
}
