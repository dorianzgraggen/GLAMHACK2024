<script lang="ts">
	import { found_ids, gps_accuracy, latitude, longitude, pictures_index, pinned_place_id } from '$lib/stores';
	import { onMount } from 'svelte';
	import "../styles.css"
	import { database } from '$lib/data';
	import { page } from '$app/stores';


	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);

		$pictures_index = Number(localStorage.getItem('pictures_index') || 0);
		console.log('pictures_index', $pictures_index);

		pictures_index.subscribe((v) => {
			localStorage.setItem('pictures_index', '' + v);
		});

		navigator.geolocation.watchPosition(
			(position) => {
				console.log('position', position);
				$gps_accuracy = position.coords.accuracy;
				$longitude = position.coords.longitude;
				$latitude = position.coords.latitude;
			},
			(error) => {
				console.error(error);
			},
			{
				maximumAge: 0,
				enableHighAccuracy: true
			}
		);

		const id = localStorage.getItem("pinned_place_id");
		if (id) {
			$pinned_place_id = id;
		}
		pinned_place_id.subscribe(v => {
			localStorage.setItem("pinned_place_id", v);
		})

		const found = localStorage.getItem("found_ids");
		if (found) {
			$found_ids = JSON.parse(found);
		}

		if (urlParams.has("found")) {
			$found_ids = ["3","4","6"];
		}

		found_ids.subscribe(ids => {
			if (!urlParams.has("found")) {
				localStorage.setItem("found_ids", JSON.stringify(ids));
			}
		})
	});
</script>

<div class="bg-accent-strong top-nav">
	<a href="/">
		<h1>Catchy Name</h1>
	</a>
</div>

<div class="content">
	<slot></slot>
</div>


<div style="display: none">

	{#each database as place}
		<a href={"/place/" + place.id}></a>
		<!-- <a href={"/place/" + place.id + "/camera"}></a> -->
	{/each}
</div>

<style>

	h1 {
		font-size: 18px;
		text-align: center;
		margin: 0;
	}
	.top-nav {
		color: white;
		padding: 12px;
	}

	.top-nav a {
		text-decoration: none;
		color: white;
	}

	.content {
		margin: 18px;
	}
</style>