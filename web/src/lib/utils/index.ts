import { onMount } from 'svelte';
export function containsPath(container: string | null | undefined, containment: string): boolean {
	if (container) return container.includes(containment);
	return false;
}

export function fetchFaviconFromURL(domain: string, size: number | string): string {
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export function useFocusFirstField(className: string) {
	onMount(() => {
		const firstInput = document
			.getElementsByClassName(className)[0]
			?.querySelector('input') as HTMLInputElement;
		if (firstInput) {
			firstInput.focus();
		}
	});
}
