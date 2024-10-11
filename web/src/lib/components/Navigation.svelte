<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
                resolve();
				await navigation.complete;
			});
		});
	});
</script>
