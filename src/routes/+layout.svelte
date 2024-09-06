<script lang="ts">
	import { allowed_gps, found_ids, gps_accuracy, latitude, longitude, pictures_index, pinned_place_id } from '$lib/stores';
	import { onMount } from 'svelte';
	import "../styles.css"
	import { database } from '$lib/data';
	import { page } from '$app/stores';
	import { GPSState } from '$lib/types';


	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);

		$pictures_index = Number(localStorage.getItem('pictures_index') || 0);
		console.log('pictures_index', $pictures_index);

		pictures_index.subscribe((v) => {
			localStorage.setItem('pictures_index', '' + v);
		});

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

	function startGPS() {
		if (typeof navigator.geolocation === "undefined") {
			$allowed_gps = GPSState.Unsupported;
			return;
		}

		$allowed_gps = GPSState.Checking;

		navigator.geolocation.watchPosition(
			(position) => {
				console.log('position', position);
				$gps_accuracy = position.coords.accuracy;
				$longitude = position.coords.longitude;
				$latitude = position.coords.latitude;
				$allowed_gps = GPSState.Ready;
			},
			(error) => {
				console.error(error);
				$allowed_gps = GPSState.Declined;
			},
			{
				maximumAge: 0,
				enableHighAccuracy: true
			}
		);
	}
</script>


<div class="bg-accent-strong top-nav">
	<a href="/">
		<h1>Catchy Name</h1>
	</a>
</div>

{#if $allowed_gps === GPSState.Ready }


<div class="content">
	<slot></slot>
</div>



{:else if  $allowed_gps === GPSState.Unknown}

	<div class="pre-screen">
		<div>
			<p>This app needs access to your GPS to function.</p>
			<button class="btn" on:click={() => startGPS()}>Enable GPS</button>
		</div>
	</div>

{:else if  $allowed_gps === GPSState.Declined}

	<div class="pre-screen">
		<div>
			<p>Please go to page settings and allow this page to access your location.</p>
			<button class="btn" on:click={() => window.location.reload()}>Reload Page</button>
		</div>
	</div>

{:else if  $allowed_gps === GPSState.Checking}

	<div class="pre-screen">
		<p>Checking permissions...</p>
	</div>

{:else}

	<div class="pre-screen">
		<p>this device does not support the gps api</p>
	</div>

{/if}


<div style="display: none">

	{#each database as place}
		<a href={"/place/" + place.id}></a>
		<a href={"/place/" + place.id + "/camera"}></a>
	{/each}
</div>



<style>

	.pre-screen {
		position: absolute;
		top: 27px;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px;
	}

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

	:global(.content > *) {
		margin: 18px;
	}
</style>