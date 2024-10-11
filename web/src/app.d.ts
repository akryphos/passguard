import type { Vault } from 'phosphor-svelte';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
	}
}

interface User {
	id: string;
	email: string;
	name: string;
}

type IconType = typeof Vault;

export { IconType, User };
