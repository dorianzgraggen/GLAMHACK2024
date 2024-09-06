<script lang="ts">
	import { gps_accuracy, latitude, longitude, pictures_index } from '$lib/stores';
	import { onMount } from 'svelte';

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
	});
</script>

<slot></slot>
