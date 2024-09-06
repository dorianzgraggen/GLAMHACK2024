<script lang="ts">
	import { onMount } from 'svelte';
	import { database } from '$lib/data';
	import { calculateDistance, getSteps } from '$lib/dist';
	import { found_ids, latitude, longitude, pinned_place_id } from '$lib/stores';
	import PlaceListItem from '../components/PlaceListItem.svelte';

	let position_changed_counter = 0;

	$: {
		database.forEach(record => {
			record.distance = getSteps(calculateDistance($latitude, $longitude, record.latitude, record.longitude))
		})

		database.sort((a, b) => a.distance - b.distance);

		position_changed_counter++;
	}

	$: pinned_place = database.find(p => p.id == $pinned_place_id);

</script>

<!-- This is the landing page where we will have all the spots and the distances to the spots -->





<div class="banner round"></div>

<h2>Your pinned priority</h2>
{#key $longitude}
	{#if pinned_place && !$found_ids.includes($pinned_place_id)}
		<PlaceListItem place={pinned_place}></PlaceListItem>
	{:else}
	<div class="no-pin round">

		<p>Pin a destination to see it here</p>
	</div>
	{/if}
{/key}

<h2>Your next destination</h2>



<div class="places">
	{#key position_changed_counter}
		{#each database as place}
			{#if !$found_ids.includes(place.id)}
				<PlaceListItem {place}></PlaceListItem>
			{/if}
		{/each}
	{/key}
</div>


<h2>Your collection</h2>


{#if $found_ids.length > 0}
	<div class="found-list bg-accent round">
		{#key position_changed_counter}
			{#each database as place}
				{#if $found_ids.includes(place.id)}
					<a href={`/place/${place.id}`} class="found-item">
						<div></div>
						<div>{place.title}</div>
					</a>
				{/if}
			{/each}
		{/key}
	</div>
{:else}
	<p>Start capturing places to add them to your collection</p>
{/if}


<style>

	.banner {
		background-image: url(https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg);
		background-size: cover;
		background-position: center;
		width: 100%;
		aspect-ratio: 2.8;
	}

	.no-pin {
		display: flex;
		height: 228px;
		outline: 2px dashed var(--accent);
  		background: none;
		align-items: center;
		justify-content: center;
	}

	.places {
		width: 100%;
		overflow-x: scroll;
		display: grid;
		grid-auto-flow: column;
		gap: 12px;
		grid-auto-columns: 140px;
	}

	.found-list {
		display: grid;
		gap: 12px;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 12px;
	}

	.found-item {
		text-align: center;
		display: flex;
		align-items: center;
        justify-content: center;
        flex-direction: column;
		text-decoration: none;
		color: black;
	}


	.found-item > div:first-child {
		width: 80px;
		height: 80px;
		background-image: url(https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg);
		background-size: cover;
		background-position: center;
		border-radius: 9999px;
	}

	h2 {
		font-size: 16px;
		margin-top: 30px;
		margin-bottom: 10px;
	}
</style>
