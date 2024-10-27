import { PROTECTED_ROUTES } from '$lib/constants';
import outmatch from 'outmatch';

async function isProtectedRoute(pathname: string, routes = PROTECTED_ROUTES) {
	return routes.some((path) => {
		return outmatch(path)(pathname);
	});
}

export const authServices = {
	isProtectedRoute
};
