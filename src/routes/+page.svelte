<script lang="ts">
	import { onMount } from 'svelte';
	import { database } from '$lib/data';
	import { calculateDistance } from '$lib/dist';
</script>

<!-- This is the landing page where we will have all the spots and the distances to the spots -->

<h1>Spots</h1>
{#each database as record}
	 <h2>latitude: {record.latitude}, longitude: {record.longitude}
		distance: {calculateDistance(47.3326290293885, 7.681612352815078, record.latitude, record.longitude)}
	 </h2>
{/each}