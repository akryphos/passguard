import { Routes } from '$lib/constants';
import { auth_hook } from '$lib/server/auth_hook';
import { authServices } from '$lib/server/services/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const protected_routes_hook: Handle = async ({ event, resolve }) => {
	const { url, locals } = event;

	const isProtectedRoute = await authServices.isProtectedRoute(url.pathname);

	if (isProtectedRoute && !locals.user) {
		throw redirect(302, Routes.LOGIN);
	}

	return resolve(event);
};

export const handle = sequence(auth_hook, protected_routes_hook);
