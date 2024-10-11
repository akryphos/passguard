<script lang="ts">
	import '$lib/styles/app.scss';
	import { IconContext } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';

	// Import Components
	import ViewTransition from '$lib/components/Navigation.svelte';
	import { Toaster } from 'svelte-french-toast';

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

	<Toaster />
</IconContext>

<style>
	#app {
		height: 100dvh;
		width: 100dvw;
		display: grid;
	}
</style>
