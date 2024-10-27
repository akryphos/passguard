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
		background: var(--bg-input, rgba(0, 0, 0, 0.3));
		overflow: hidden;
		gap: var(--spacing-12);
		display: flex;
		align-items: center;
		border-radius: var(--rounded-4);
		border: 1px solid var(--focus-color, var(--border));

		&:focus-within {
			border: 1px solid var(--focus-color, var(--primary));
		}

		input {
			padding: var(--spacing-12);
			min-width: 0;
			width: 100%;

			&::placeholder {
				color: #989c9e;
			}
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
