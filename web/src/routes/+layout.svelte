<script lang="ts">
	import '$lib/styles/app.scss';
	import { IconContext } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';
	// Import Components
	import ViewTransition from '$lib/components/Navigation.svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<svelte:head>
	<title>Passguard</title>
</svelte:head>

<IconContext values={{ weight: 'bold', size: '24', color: 'currentColor' }}>
	<!-- Adds transition between pages -->
	<ViewTransition />

	<div id="app">
		{@render children()}
	</div>
</IconContext>

<style>
	#app {
		height: 100dvh;
		width: 100dvw;
		display: grid;
		grid-template-columns: 80px 1fr;
	}
</style>
