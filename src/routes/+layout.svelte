<script lang="ts">
	import { pictures_index } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		$pictures_index = Number(localStorage.getItem('pictures_index') || 0);
		console.log('pictures_index', $pictures_index);

		pictures_index.subscribe((v) => {
			localStorage.setItem('pictures_index', '' + v);
		});
	});
</script>

<slot></slot>

