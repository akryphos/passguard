<script lang="ts">
	import '$lib/styles/_auth.scss';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="auth-box">
	<img src="/auth.png" alt="Auth Vector" />
	{@render children()}
</div>

<style>
	.auth-box {
		background-color: var(--bg-surface-2);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: var(--rounded-8);
		padding: var(--spacing-16);
		width: 45dvw;
		min-width: 620px;
		height: 45dvh;
		min-height: 420px;
		display: flex;
		gap: var(--spacing-16);
		box-shadow: var(--shadow-md);

		img {
			height: 100%;
			width: 50%;
			border-radius: var(--rounded-8);
			flex-shrink: 0;
		}
	}

	@media (max-width: 768px) {
		.auth-box {
			width: 80dvw;
			min-width: 300px;
			height: fit-content;
			min-height: 400px;

			img {
				display: none;
			}
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	::view-transition-old(auth-box) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	::view-transition-new(auth-box) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
