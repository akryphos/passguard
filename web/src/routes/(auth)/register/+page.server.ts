import { BASE_API_URL } from '$env/static/private';
import { Routes } from '$lib/constants.js';
import { setCookieFromAPI } from '$lib/utils/cookies';
import { fail, redirect } from '@sveltejs/kit';

//! TODO: Hash password before sending it to API

export const actions = {
	default: async ({ cookies, fetch, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const firstName = formData.get('first-name') as string;
		const lastName = formData.get('last-name') as string;

		if (!email || !password || !firstName || !lastName) {
			return fail(400, { error: 'All the fields are required' });
		}

		const body = JSON.stringify({ email, password, fullName: `${firstName} ${lastName}` });

		const res = await fetch(`${BASE_API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (!res.ok) {
			return fail(400, { error: await res.text() });
		}

		const isCookieSet = setCookieFromAPI(res, cookies);

		if (!isCookieSet) {
			return fail(500, { error: 'Something went wrong!' });
		}

		throw redirect(302, Routes.APP_ROOT);
	}
};
