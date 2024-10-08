<script lang="ts">
	import '$lib/styles/app.scss';

	import { IconContext } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<IconContext values={{ weight: 'bold', size: '24', color: 'currentColor' }}>
	{@render children()}
</IconContext>
