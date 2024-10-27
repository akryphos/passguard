<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Routes } from '$lib/constants';
	import { containsPath } from '$lib/utils';
	import { Gear, Heart, Key, Lock, Note, Trash } from 'phosphor-svelte';
	
	import type { NavItem } from '$lib/types/ui';
	import type { IconType } from '@app-types';

	const navItems: NavItem[] = [
		{ name: 'Vault', path: Routes.APP_VAULT, Icon: Key },
		{ name: 'Notes', path: Routes.APP_NOTES, Icon: Note },
		{ name: 'Favorites', path: Routes.APP_FAVORITES, Icon: Heart },
		{ name: 'Trash', path: Routes.APP_TRASH, Icon: Trash }
	];

	const controlItems: (Omit<NavItem, 'Icon'> & { Icon: IconType | null })[] = [
		{ name: 'Profile', path: Routes.APP_PROFILE, Icon: null },
		{ name: 'Settings', path: Routes.APP_SETTINGS, Icon: Gear }
	];
</script>

<div class="sidebar">
	{#each navItems as { name, path, Icon } (path)}
		<a class="nav-item" class:active={containsPath($page.url.pathname, path)} href={path}>
			<svelte:component
				this={Icon}
				size={28}
				weight={containsPath($page.url.pathname, path) ? 'fill' : 'bold'}
			/>
		</a>
	{/each}

	<div class="spacer"></div>

	{#each controlItems as { name, path, Icon } (path)}
		<a class="control-item" class:active={containsPath($page.url.pathname, path)} href={path}>
			{#if Icon}
				<svelte:component this={Icon} size={28} />
			{:else}
				<img src="https://i.pravatar.cc/300" alt="Profile" />
			{/if}
		</a>
	{/each}

	<form class="control-item" action="/logout" method="POST" use:enhance>
		<button><Lock size={28} /></button>
	</form>
</div>

<style>
	.sidebar {
		width: var(--sidebar-size);
		background-color: var(--bg-surface-2);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-16);
		padding: var(--spacing-32) 0;
		border-right: 2px solid var(--border);

		.nav-item,
		.control-item {
			view-transition-name: none;
			padding: var(--spacing-8);
			border-radius: var(--rounded-full);
			width: 4.4rem;
			height: 4.4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			transition: all 0.3s ease-in-out;

			&:hover {
				background-color: rgba(0, 0, 0, 0.2);
			}

			&.active {
				color: var(--primary);
				background-color: rgba(var(--primary-rgb), 0.25);
				border: 2px solid var(--primary);
			}
		}

		.control-item > img {
			border-radius: var(--rounded-full);
		}

		.spacer {
			flex: 1;
		}
	}
</style>
