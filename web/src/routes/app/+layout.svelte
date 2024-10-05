<script lang="ts">
	import '$lib/styles/app.scss';
	import type { Snippet } from 'svelte';

	const { children, data } = $props<{ children: Snippet }>();
	console.log(data);
	
</script>

User Name: {data.user.name}
{@render children()}
