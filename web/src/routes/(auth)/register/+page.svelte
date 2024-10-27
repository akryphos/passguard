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
	<title>Passguard - Register</title>
</svelte:head>

<form method="post" use:enhance>
	<div class="greet-wrapper">
		<h3>Welcome, 👋</h3>
		<span>Enter your details to register</span>
	</div>

	<div class="field-wrapper">
		<div class="full-name">
			<Input name="first-name" type="text" placeholder="First Name" />
			<Input name="last-name" type="text" placeholder="Last Name" />
		</div>

		<Input name="email" type="email" placeholder="Email" />
		<Input name="password" type="password" placeholder="Password" />
	</div>

	<!-- Error Messages -->
	{#if form?.error}
		<div class="error">
			<XCircle size="18" />
			<p>{form.error}</p>
		</div>
	{/if}

	<button class="btn" type="submit">Sign Up</button>
	<p>Already have an account? <a href="/login">Login</a></p>
</form>
