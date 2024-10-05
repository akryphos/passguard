import { BASE_API_URL } from '$env/static/private';

export const CONST = {
	BASE_API_URL: process.env.NODE_ENV === 'production' ? BASE_API_URL : 'http://localhost:3049/api'
};
