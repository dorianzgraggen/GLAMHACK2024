<script lang="ts">
	import { page } from '$app/stores';
	import { database } from '$lib/data';
	import { ignore_distance_check } from '$lib/stores';
    import Allowed from './allowed.svelte';


    const place = database.find(e => e.id === $page.params.slug);

    const thumbnail =  `/img/${place?.images[0]}`;

    console.log({place})
</script>



{#if $ignore_distance_check || (place && place.distance < 75)}
    <Allowed></Allowed>
{:else}
    <div class="far-away">

        <div>

            <div class="img" style={`background-image: url(${thumbnail})`}></div>
            <p>You're still</p>
                

            <p class="bold steps">
                {place?.distance} steps
            </p>
                
                <p>away from this spot. Get closer to capture it.</p>
            <button class="btn" on:click={() => window.history.back()}>Go Back</button>
        </div>
    </div>
{/if}

<style>

    .img {
        width: 50%;
        padding-bottom: 50%;
        border-radius: 9999px;
        margin: 20px;
        background-size: cover;
        background-position: center;
        
    }
    p {
        margin: 2px;
    }

    .steps {
        font-size: 28px;
    }

    button {
        margin: 20px;
    }

    .far-away {
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

    .far-away > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>