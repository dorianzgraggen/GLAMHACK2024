<script lang="ts">
	import { page } from '$app/stores';
	import { database } from '$lib/data';
	import { ignore_distance_check } from '$lib/stores';
    import Allowed from './allowed.svelte';


    const place = database.find(e => e.id === $page.params.slug);

    console.log({place})
</script>



{#if $ignore_distance_check || (place && place.distance < 75)}
    <Allowed></Allowed>
{:else}
    <div class="far-away">
        <div>
            <p>Get closer to the object to capture it.</p>
            <button class="btn" on:click={() => window.history.back()}>Go Back</button>
        </div>
    </div>
{/if}

<style>
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
</style>