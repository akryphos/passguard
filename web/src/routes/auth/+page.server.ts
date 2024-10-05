import { CONST } from '$lib/constants';
import { setCookieFromAPI } from '$lib/utils/cookies.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, fetch, cookies, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				missing: true
			});
		}

		const response = await fetch(`${CONST.BASE_API_URL}/auth/login`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		// Forwards cookies received from API
		setCookieFromAPI(response, cookies);
		
		const data = await response.json();
		
		if (!response.ok) {
			return fail(400, {
				message: data.message
			});
		}

		throw redirect(302, '/app');
	},

	register: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;

		if (!email || !password || !name) {
			return fail(400, {
				missing: true
			});
		}

		const response = await fetch(`${CONST.BASE_API_URL}/auth/register`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				name
			})
		});

		// Forwards cookies received from API
		setCookieFromAPI(response, cookies);

		const data = await response.json();

		if (!response.ok) {
			return fail(400, {
				message: data.message
			});
		}

		return data as { userId: string };
	}
};
