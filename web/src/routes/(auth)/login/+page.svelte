<script lang="ts">
	import { enhance } from '$app/forms';
	import { useFocusFirstEmptyField } from '$lib/utils';
	// Import Components
	import Input from '$lib/components/Input.svelte';
	import { XCircle } from 'phosphor-svelte';

	// Focus on the first input field
	useFocusFirstEmptyField('field-wrapper');

	const { form } = $props();

	$effect(() => {
		form?.error && useFocusFirstEmptyField('field-wrapper');
	});
</script>

<svelte:head>
	<title>Passguard - Login</title>
</svelte:head>

<form method="post" use:enhance>
	<div class="greet-wrapper">
		<h3>Welcome Back, 👋</h3>
		<span>Please login to continue</span>
	</div>

	<div class="field-wrapper">
		<Input name="email" type="email" placeholder="Email" />
		<Input name="password" type="password" placeholder="Password" />
	</div>

	<a class="forgot-password" href="/forget-password">Forgot Password?</a>

	<!-- Error Messages -->
	{#if form?.error}
		<div class="error">
			<XCircle size="18" />
			<p>{form.error}</p>
		</div>
	{/if}

	<button class="btn" type="submit">Login</button>
	<p>Don't have an account? <a href="/register">Register</a></p>
</form>
