export const Routes = {
	// Auth Routes
	LOGIN: '/login',
	LOGOUT: '/logout',
	REGISTER: '/register',

	// App Routes
	ROOT: '/',
	VAULT: '/vault',
	NOTES: '/notes',
	FAVORITES: '/favorites',
	TRASH: '/trash',
	PROFILE: '/profile',
	SETTINGS: '/settings'
};

export const PROTECTED_ROUTES = [
	Routes.ROOT,
	Routes.VAULT,
	Routes.NOTES,
	Routes.FAVORITES,
	Routes.TRASH
];
