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
	<title>Passguard - Register</title>
</svelte:head>

<form method="post" use:enhance>
	<div class="greet-wrapper">
		<h3>Welcome</h3>
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

	<button class="btn" type="submit">Sign Up</button>
	<p>Already have an account? <a href="/login">Login</a></p>
</form>
