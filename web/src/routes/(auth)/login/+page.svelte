<script lang="ts">
	import { enhance } from '$app/forms';
	import { useFocusFirstField } from '$lib/utils';
	import toast from 'svelte-french-toast';

	// Import Components
	import Input from '$lib/components/Input.svelte';

	// Focus on the first input field
	useFocusFirstField('field-wrapper');

	const { form } = $props();

	$effect(() => {
		if (form?.error) {
			toast.error(form.error, {
				position: 'bottom-center',
				ariaProps: { role: 'status', 'aria-live': 'polite' },
				duration: 2000,
				style: 'background-color: var(--bg-surface-2); color: #eee;',
				iconTheme: {
					primary: '#FF3D3D',
					secondary: ''
				}
			});
		}
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
	<button class="btn" type="submit">Submit</button>
	<p>Don't have an account? <a href="/register">Register</a></p>
</form>
