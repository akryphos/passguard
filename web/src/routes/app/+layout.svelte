<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<Sidebar />
{@render children()}
