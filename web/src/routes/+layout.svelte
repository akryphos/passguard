<script lang="ts">
	import '$lib/styles/app.scss';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

{@render children()}
