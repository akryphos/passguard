<script lang="ts">
	import '$lib/styles/_auth.scss';
	import type { Snippet } from 'svelte';

	const { children } = $props<{ children: Snippet }>();
</script>

<div class="auth-box">
	<!-- Temporary -->
	<img
		src="https://plus.unsplash.com/premium_photo-1670155857330-0f4ecdc918ee?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		alt="LOL"
	/>
	{@render children()}
</div>

<style>
	.auth-box {
		background-color: var(--bg-surface-2);
		place-self: center;
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
