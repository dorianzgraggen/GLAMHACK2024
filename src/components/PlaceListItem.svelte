<script lang="ts">
	import { pinned_place_id } from "$lib/stores";
	import type { Place } from "$lib/types";

    export let place: Place;

    
    const img = "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg";


    function pin()
    {
        if ($pinned_place_id === place.id) {
            $pinned_place_id = ""
        } else {
            $pinned_place_id = place.id;
        }
    }
</script>

<div class="place bg-accent round">
    <div class="img" style={`background-image: url(${img})`}></div>

    <button class="pin" on:click={pin}>

        {#if $pinned_place_id === place.id}
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.75 12.75H12.25V11.43C12.2499 11.1509 12.1719 10.8774 12.0248 10.6403C11.8777 10.4031 11.6674 10.2117 11.4175 10.0875L10.0825 9.4125C9.83259 9.28832 9.62228 9.09688 9.47521 8.85972C9.32814 8.62255 9.25015 8.34906 9.25 8.07V4.5H10C10.3978 4.5 10.7794 4.34196 11.0607 4.06066C11.342 3.77936 11.5 3.39782 11.5 3C11.5 2.60218 11.342 2.22064 11.0607 1.93934C10.7794 1.65804 10.3978 1.5 10 1.5H4C3.60218 1.5 3.22064 1.65804 2.93934 1.93934C2.65804 2.22064 2.5 2.60218 2.5 3C2.5 3.39782 2.65804 3.77936 2.93934 4.06066C3.22064 4.34196 3.60218 4.5 4 4.5H4.75V8.07C4.74985 8.34906 4.67186 8.62255 4.52479 8.85972C4.37772 9.09688 4.16741 9.28832 3.9175 9.4125L2.5825 10.0875C2.33259 10.2117 2.12228 10.4031 1.97521 10.6403C1.82814 10.8774 1.75015 11.1509 1.75 11.43V12.75Z" fill="#1F1F1F"/>
                <path d="M7 12.75V16.5M1.75 12.75H12.25V11.43C12.2499 11.1509 12.1719 10.8774 12.0248 10.6403C11.8777 10.4031 11.6674 10.2117 11.4175 10.0875L10.0825 9.4125C9.83259 9.28832 9.62228 9.09688 9.47521 8.85972C9.32814 8.62255 9.25015 8.34906 9.25 8.07V4.5H10C10.3978 4.5 10.7794 4.34196 11.0607 4.06066C11.342 3.77936 11.5 3.39782 11.5 3C11.5 2.60218 11.342 2.22064 11.0607 1.93934C10.7794 1.65804 10.3978 1.5 10 1.5H4C3.60218 1.5 3.22064 1.65804 2.93934 1.93934C2.65804 2.22064 2.5 2.60218 2.5 3C2.5 3.39782 2.65804 3.77936 2.93934 4.06066C3.22064 4.34196 3.60218 4.5 4 4.5H4.75V8.07C4.74985 8.34906 4.67186 8.62255 4.52479 8.85972C4.37772 9.09688 4.16741 9.28832 3.9175 9.4125L2.5825 10.0875C2.33259 10.2117 2.12228 10.4031 1.97521 10.6403C1.82814 10.8774 1.75015 11.1509 1.75 11.43V12.75Z" stroke="#1F1F1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            
        {:else}
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12.75V16.5M1.75 12.75H12.25V11.43C12.2499 11.1509 12.1719 10.8774 12.0248 10.6403C11.8777 10.4031 11.6674 10.2117 11.4175 10.0875L10.0825 9.4125C9.83259 9.28832 9.62228 9.09688 9.47521 8.85972C9.32814 8.62255 9.25015 8.34906 9.25 8.07V4.5H10C10.3978 4.5 10.7794 4.34196 11.0607 4.06066C11.342 3.77936 11.5 3.39782 11.5 3C11.5 2.60218 11.342 2.22064 11.0607 1.93934C10.7794 1.65804 10.3978 1.5 10 1.5H4C3.60218 1.5 3.22064 1.65804 2.93934 1.93934C2.65804 2.22064 2.5 2.60218 2.5 3C2.5 3.39782 2.65804 3.77936 2.93934 4.06066C3.22064 4.34196 3.60218 4.5 4 4.5H4.75V8.07C4.74985 8.34906 4.67186 8.62255 4.52479 8.85972C4.37772 9.09688 4.16741 9.28832 3.9175 9.4125L2.5825 10.0875C2.33259 10.2117 2.12228 10.4031 1.97521 10.6403C1.82814 10.8774 1.75015 11.1509 1.75 11.43V12.75Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        {/if}

    </button>


    <h3 class="regular">{place.title}</h3>
    <div class="bold">{place.distance} Steps left</div>

    <div>
        <a href="/camera" class="camera-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 4H9.5L7 7H4C3.46957 7 2.96086 7.21071 2.58579 7.58579C2.21071 7.96086 2 8.46957 2 9V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H17L14.5 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
        </a>
    </div>

</div>

<style>

    .place {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 20px;
        padding-bottom: 0px;
    }

    .img {
        width: 100px;
        height: 100px;
        border-radius: 5000px;
        background-size: cover;
        background-position: center;
    }

    .pin {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 12px;
        background: none;
        border: 0;
    }

    h3 {
        font-size: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .camera-btn {
        padding: 12px 20px;
        display: flex;
    }
    
</style>