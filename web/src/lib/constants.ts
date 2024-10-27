export const Routes = {
	ROOT: '/',

	// Auth Routes
	LOGIN: '/login',
	LOGOUT: '/logout',
	REGISTER: '/register',

	// App Routes
	APP_ROOT: '/app',
	APP_VAULT: '/app/vault',
	APP_NOTES: '/app/notes',
	APP_FAVORITES: '/app/favorites',
	APP_TRASH: '/app/trash',
	APP_PROFILE: '/app/@me',
	APP_SETTINGS: '/app/settings'
};

export const PROTECTED_ROUTES = [
	Routes.APP_ROOT,
	Routes.APP_VAULT,
	Routes.APP_NOTES,
	Routes.APP_FAVORITES,
	Routes.APP_TRASH,
	Routes.APP_SETTINGS,
	Routes.APP_PROFILE
];
