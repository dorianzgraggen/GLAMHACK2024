<script lang="ts">
	import { gps_accuracy, latitude, longitude, pictures_index, pinned_place_id } from '$lib/stores';
	import { onMount } from 'svelte';
	import "../styles.css"

	onMount(async () => {
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
	});
</script>

<div class="bg-accent-strong top-nav">
	<h1>Explore By Finding</h1>
</div>

<div class="content">
	<slot></slot>
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

	.content {
		margin: 18px;
	}
</style>