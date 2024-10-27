import { onMount } from 'svelte';

export function containsPath(container: string | null | undefined, containment: string): boolean {
	if (container) return container.includes(containment);
	return false;
}

export function fetchFaviconFromURL(domain: string, size: number | string): string {
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function useFocusFirstEmptyField(className: string) {
	onMount(() => {
		// Get the container element by class name
		const container = document.getElementsByClassName(className)[0];

		if (container) {
			// Find the first empty input field within the container
			const firstEmptyInput = Array.from(container.querySelectorAll('input')).find(
				(input) => !(input as HTMLInputElement).value
			) as HTMLInputElement;

			// Focus the first empty input field if it exists
			if (firstEmptyInput) {
				firstEmptyInput.focus();
			}
		}
	});
}
