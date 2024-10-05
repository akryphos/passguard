import { CONST } from '$lib/constants.js';
import { setCookieFromAPI } from '$lib/utils/cookies.js';
import { redirect } from '@sveltejs/kit';



export const actions = {
	logout: async ({ fetch, cookies }) => {
		const res = await fetch(`${CONST.BASE_API_URL}/auth/logout`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			setCookieFromAPI(res, cookies);
		}

		throw redirect(307, '/auth');
	}
};
