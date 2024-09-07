<script lang="ts">
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
        if (slides.length > 0) {
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
    <div class="main-body">

        <h1>{place?.title}</h1>

        <!-- Slideshow container -->
        <div class="slideshow-container">
            <!-- The images -->
            {#each place.images as img_file, i}
            <div class="mySlides">
                <img src="/img/{img_file}" alt="{place.title}">
                <div class="caption">{i} - {place.image_description[i]}</div>
            </div>
            {/each}
            {#if place.images.length > 1}
                <!-- Next and previous buttons -->
                <a class="prev" on:click={() => plusSlides(-1)}>&#10094;</a>
                <a class="next" on:click={() => plusSlides(1)} >&#10095;</a>
            {/if}
        </div>
        <br>

        {#if place.images.length > 1}
            <!-- The dots/circles -->
            <div style="text-align:center">
                {#each place.images as img_file, i}
                    <span class="dot" on:click={() => currentSlide(i)}></span>
                {/each}
            </div>
        {/if}

        <div class="description-text">{place?.description}</div>
        
    </div>
</div>

<style>
    .background {
        height: 45vh; /* Keeping the background height constant */
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
        height: 70vh;
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
        height: 60vh;
    }

    .rest {
        padding-top: 20px;
        background-color: white;
        border-radius: 20px 20px 0 0;
        margin-top: -5px; /* Overlapping effect */
        transition: margin-top 0.2s;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2); /* Adding shadow for better distinction */
        margin-left: 0;
        margin-right: 0;
    }

    .rest.large_user_image {
        margin-top: -85px;
    }

    .rest > * {
        margin: 20px;
    }

    .rest > h1 {
        margin-top: 0;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 1.5rem;
    }

    .description-text {
        font-family: 'Arial', sans-serif;
        font-size: 0.9rem;
        color: gray;
        text-align: justify;
        margin: 0 20px;
    }

    .main-body {
        width: 80%;
        max-width: 1920px;
        margin: auto;
    }

    /* Slideshow container */
    .slideshow-container {
        width: 80vw;
        height: 50vh; /* Set fixed height for the slideshow container */
        position: relative;
        margin: auto;
        border-radius: 10px;
        background-color: var(--accent);
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }

    /* Hide the images by default */
    .mySlides {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin: auto;
        display: none;
        justify-content: center;
        align-items: center;
    }

    .mySlides img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin: auto;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    }

    /* Image-caption */
    .caption {
        background-color: var(--accent);
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
    }

    /* Next & previous buttons */
    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        user-select: none;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }

    /* The dots/circles */
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 5px 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }

    .active, .dot:hover {
        background-color: #717171;
    }

</style>
