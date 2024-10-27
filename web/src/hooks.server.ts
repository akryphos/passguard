import { Routes } from '$lib/constants';
import authHook from '$lib/server/hooks/auth';
import { authServices } from '$lib/server/services/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const protectedRoutesHook: Handle = async ({ event, resolve }) => {
	const { url, locals } = event;

	const isProtectedRoute = await authServices.isProtectedRoute(url.pathname);

	if (isProtectedRoute && !locals.user) {
		throw redirect(302, Routes.LOGIN);
	}

	return resolve(event);
};

const appHook: Handle = async ({ event, resolve }) => {
	const { url } = event;

	if (url.pathname === Routes.APP_ROOT) {
		throw redirect(302, Routes.APP_VAULT);
	}

	return resolve(event);
};
export const handle = sequence(authHook, protectedRoutesHook, appHook);
