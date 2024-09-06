<script lang="ts">
	import { onMount } from 'svelte';
	import { database } from '$lib/data';
	import { calculateDistance, getSteps } from '$lib/dist';
	import { latitude, longitude } from '$lib/stores';
</script>

<!-- This is the landing page where we will have all the spots and the distances to the spots -->

<h1>Spots</h1>
{#each database as record}
	 <h2>current latitude: {$latitude}, current longitude: {$longitude} 
		distance: {getSteps(calculateDistance($latitude, $longitude, record.latitude, record.longitude))}
	 </h2>
{/each}