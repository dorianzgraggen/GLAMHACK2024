<script lang="ts">
	//import type { PageData } from './$types';
	//export let data: PageData;
	import { page } from '$app/stores';
	export let slug = $page.params.slug;
	import { onMount } from 'svelte';
 
	// Load data
	import { database } from '$lib/data';
	const place = database.find(e => e.id == slug)!;
		
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


<div class="background" style={`background-image: url(${localStorage.getItem(id)})`}></div>

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


<style>
	.background {
		height: 50vh;
		background-size: cover;
		background-position: center;
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