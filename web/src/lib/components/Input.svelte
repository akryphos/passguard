<script lang="ts">
	const { type, ...rest } = $props();
	import { Eye, EyeClosed } from 'phosphor-svelte';

	let showPassword = $state(false);
</script>

<div class="input-wrapper" class:pw={type === 'password'}>
	<input
		type={type === 'password' ? (showPassword ? 'text' : 'password') : (type as string)}
		{...rest}
	/>
	{#if type === 'password'}
		<button type="button" onclick={() => (showPassword = !showPassword)} class="icon">
			{#if showPassword}
				<Eye />
			{:else}
				<EyeClosed />
			{/if}
		</button>
	{/if}
</div>

<style>
	.input-wrapper {
		background: #3b364c;
		overflow: hidden;
		gap: var(--spacing-12);
		display: flex;
		align-items: center;
		border-radius: var(--rounded-4);

		&:focus-within {
			border: 2px solid #746898;
		}

		input {
			padding: var(--spacing-12);
			min-width: 0;
			width: 100%;
		}

		&.pw {
			padding-right: var(--spacing-12);
		}

		.icon {
			color: #a8a8a8;
			cursor: pointer;
		}
	}
</style>
