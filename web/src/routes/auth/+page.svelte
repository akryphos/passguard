<script lang="ts">
	import { enhance } from '$app/forms';
	import { blur } from 'svelte/transition';

	const { form } = $props();

	let mode = $state<'register' | 'login'>('login');

	function toggleMode() {
		mode = mode === 'login' ? 'register' : 'login';
	}
</script>

<div class="auth-box">
	<div class="mode-selector">
		{@render mode_button({
			label: 'Register',
			onclick: toggleMode,
			isActive: mode === 'register'
		})}
		{@render mode_button({ label: 'Login', onclick: toggleMode, isActive: mode === 'login' })}
	</div>

	<form method="post" action={mode === 'register' ? '?/register' : '?/login'} use:enhance>
		<div class="greet-wrapper">
			<span>
				Welcome {#if mode === 'login'}Back{/if},</span
			>
			{#if mode === 'register'}
				<p>Register now to enjoy our services :)</p>
			{:else}
				<p>Login into your account to continue...</p>
			{/if}
		</div>

		<div class="input-wrapper">
			{#if mode === 'register'}
				<input
					in:blur={{ delay: 300 }}
					out:blur={{ duration: 200 }}
					type="text"
					name="name"
					placeholder="Enter your Name..."
				/>
			{/if}

			<input type="email" name="email" placeholder="Enter your email..." />
			<input type="password" name="password" placeholder="Enter your password..." />
		</div>

		{#if form?.missing}
			<div transition:blur class="error">
				<span>X</span>
				<p>All the fields are mandatory!</p>
			</div>
		{/if}

		{#if mode === 'login'}
			<a in:blur={{ duration: 200 }} out:blur={{ duration: 300 }} href="/forget-pass"
				>Forgot Password?</a
			>
		{/if}
		<button type="submit">Login</button>
	</form>
</div>

{#if form?.userId}
	<p>Your user id is: {form.userId}</p>
{/if}

{#if form?.message}
	<p>{form.message}</p>
{/if}

{#snippet mode_button({
	label,
	onclick,
	isActive
}: {
	label: string;
	onclick: () => void;
	isActive?: boolean;
})}
	<button class="mode-btn" class:active={isActive} {onclick}>{label}</button>
{/snippet}

<style>
	.auth-box {
		background: var(--bg-surface);
		padding: var(--spacing-24);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: var(--rounded-4);
		box-shadow: var(--shadow-lg);
		display: flex;
		transition: 0.3s ease height;

		.mode-selector {
			padding-right: var(--spacing-64);
			border-right: 1px solid var(--border);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-32);
			padding: 0 var(--spacing-16);
			align-items: center;
			justify-content: center;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-16);
		border-left: 1px solid var(--border);
		padding-left: var(--spacing-24);

		.greet-wrapper {
			span {
				font-size: var(--font-24);
				font-weight: bold;
				opacity: 0.75;
			}

			p {
				font-size: var(--font-14);
				opacity: 0.5;
			}
		}

		.input-wrapper {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-8);

			input {
				width: 520px;
				padding: var(--spacing-8);
				border-radius: var(--rounded-4);
				background: var(--bg);
				border: 1px solid var(--border);

				&:focus-visible {
					border-width: 2px;
				}
			}
		}

		.error {
			color: rgb(250, 78, 78);
			display: flex;
			align-items: center;
			gap: var(--spacing-4);
			background: rgba(255, 87, 87, 0.15);
			padding: var(--spacing-4) var(--spacing-8);
			border-radius: var(--rounded-4);

			span {
				border: 1px solid rgb(250, 78, 78);
				border-radius: var(--rounded-full);
				width: 16px;
				height: 16px;
				font-size: var(--font-10);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		a {
			font-size: var(--font-12);
			color: lightblue;
			text-align: right;

			&:hover {
				text-decoration: underline;
			}
		}

		button {
			background: var(--primary);
			padding: var(--spacing-8);
			color: var(--bg);
			font-weight: bold;
			letter-spacing: 0.1ch;
			font-size: var(--font-18);
			text-transform: uppercase;
			font-family: var(--font-mono);
			border-radius: var(--rounded-4);
		}
	}

	.mode-btn {
		border: 2px solid var(--border);
		border-radius: var(--rounded-full);
		width: 100%;
		aspect-ratio: 1/1;
		padding: var(--spacing-4);
		background: var(--bg-surface-2);

		&.active {
			border: 2px solid rgb(82, 252, 158);
		}
	}
</style>
