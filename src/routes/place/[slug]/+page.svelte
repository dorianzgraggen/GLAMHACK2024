<script lang="ts">
	//import type { PageData } from './$types';
	//export let data: PageData;
	import { page } from '$app/stores';
	export let slug = $page.params.slug;
	import { onMount } from 'svelte';
 
	// Load data
	import { database } from '$lib/data';
	const place = database.find(e => e.id == slug)!;

	let large_user_image = false;
		
	// Code for slide
	let slideIndex = 1;
	let slides : HTMLCollectionOf<HTMLElement> = ([] as unknown) as HTMLCollectionOf<HTMLElement>;
	let dots : HTMLCollectionOf<HTMLElement> = ([] as unknown) as HTMLCollectionOf<HTMLElement>;
	
	showSlides(slideIndex);
	// Next/previous controls
	function plusSlides(n:number) {
		showSlides(slideIndex += n);
	}
	// Thumbnail image controls
	function currentSlide(n:number) {
		showSlides(slideIndex = n);
	}
	function showSlides(n:number) {
		if (slides.length>0) {
			let i;
			
			if (n > slides.length) {slideIndex = 1}
			if (n < 1) {slideIndex = slides.length}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
			}
			slides[slideIndex-1].style.display = "block";
			dots[slideIndex-1].className += " active";
		}
	}
	onMount(() => {
		slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
		dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
		showSlides(0);
	});

	const id = 'user_picture_' + $page.params.slug;
</script>


<div class="background" class:large_user_image style={`background-image: url(${localStorage.getItem(id)})`}>

</div>

<button class:large_user_image class="bg-btn" on:click={() => large_user_image = !large_user_image}></button>
<div class="rest round-top" class:large_user_image>
	<h1>{place?.title}</h1>


	<!-- Slideshow container -->
	<div class="slideshow-container">

		<!-- The images -->
		{#each place.images as img_file}
		<div class="mySlides">
			<img src="/img/{img_file}" alt="{place.title}">
		</div>
		{/each}
		<!-- Next and previous buttons -->
		<a class="prev" on:click={() => plusSlides(-1)}>&#10094;</a>
		<a class="next" on:click={() => plusSlides(1)} >&#10095;</a>
	</div>
	<br>

	<!-- The dots/circles -->
	<div style="text-align:center">
		{#each place.images as img_file, i}
			<span class="dot" on:click={() => currentSlide(i)}></span>
		{/each}
	</div>

	<div>{place?.description}</div>
</div>




<style>
	.background {
		height: 40vh;
		margin: 0;
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		transition: height 0.2s;
		background-size: cover;
		background-position: center;
		
		z-index: -1;
	}

	.background.large_user_image {
		height: 73vh;

	}

	.bg-btn {
		height: 30vh;
		margin: 0;
  		width: 100%;
		transition: height 0.2s;
		background: none;
		border: none;
	}

	.bg-btn.large_user_image {
		height: 62vh;
	}


	.rest {
		padding-top: 12px;
		background-color: white;
		margin: 0;
		/* margin-top: 40vh; */
		transition: margin-top 0.2s;

		/* pointer-events: none; */
	}

	.rest.large_user_image {
		/* margin-top: 85vh; */
	}

	.rest > * {
		margin: 20px;
	}

	.rest > h1 {
		margin-top: 0;
	}

	/* Slideshow container */
	.slideshow-container {
		width: 50vw;
		height: 50vh;
		background-color: black;
		position: relative;
		margin: auto;
	}
	/* Hide the images by default */
	.mySlides {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: none;
	}
	.mySlides > img {
		width: 50vw;
		height: 50vh;
		object-fit: contain;
		display: flex;
	}
	/* Next & previous buttons */
	.prev, .next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		margin-top: -22px;
		padding: 16px;
		color: white;
		font-weight: bold;
		font-size: 18px;
		transition: 0.6s ease;
		border-radius: 0 3px 3px 0;
		user-select: none;
		background-color: rgba(0,0,0,0.5);
	}
	/* Position the "next button" to the right */
	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}
	/* The dots/bullets/indicators */
	.dot {
		cursor: pointer;
		height: 15px;
		width: 15px;
		margin: 0 2px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		transition: background-color 0.6s ease;
	}
	.active, .dot:hover {
		background-color: #717171;
	}
</style>