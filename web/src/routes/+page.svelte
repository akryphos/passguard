<script>
	import { enhance } from '$app/forms';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<form method="post" action="?/logout" use:enhance>
	<button>Logout</button>
</form>

<Sidebar />
