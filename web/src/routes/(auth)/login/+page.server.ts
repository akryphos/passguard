import { BASE_API_URL } from '$env/static/private';
import { Routes } from '$lib/constants.js';
import { setCookieFromAPI } from '$lib/utils/cookies';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, fetch, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		const response = await fetch(`${BASE_API_URL}/auth/login`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			return fail(400, { error: `Error: ${await response.text()}` });
		}

		const isCookieSet = setCookieFromAPI(response, cookies);

		if (!isCookieSet) {
			return fail(500, { error: 'Something went wrong!' });
		}

		throw redirect(302, Routes.APP_ROOT);
	}
};
