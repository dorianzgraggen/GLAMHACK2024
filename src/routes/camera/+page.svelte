<script lang="ts">
	import { pictures_index } from '$lib/stores';
	import { onMount } from 'svelte';

	let supported = false;

	let player: HTMLVideoElement;
	let captureButton: HTMLButtonElement;
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	onMount(async () => {
		supported = 'mediaDevices' in navigator;

		if (!supported) return;
		context = canvas.getContext('2d')!;

		navigator.mediaDevices
			.getUserMedia({
				video: { facingMode: 'environment' }
			})
			.then((stream) => {
				player.srcObject = stream;
			});
	});

	function onClick(e: MouseEvent) {
		context!.drawImage(player, 0, 0, canvas.width, canvas.height);
		const data_url = canvas.toDataURL();
		console.log(data_url);

		const id = 'picture_' + $pictures_index;
		localStorage.setItem(id, data_url);

		$pictures_index = $pictures_index + 1;
	}
</script>

<h1>lol {$pictures_index}</h1>
<video bind:this={player} id="player" controls autoplay muted></video>

<div>
	<button bind:this={captureButton} on:click={onClick}>Capture</button>
</div>

<div>
	{#each { length: $pictures_index } as _, i}
		<img src={localStorage.getItem('picture_' + i)} />
	{/each}
</div>
<canvas style="display: none" bind:this={canvas} width="320" height="240"></canvas>

<style>
	video {
		width: 100%;
	}
</style>
