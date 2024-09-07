<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { found_ids } from '$lib/stores';
    import { onMount, createEventDispatcher } from 'svelte';

    

    // const dispatch = createEventDispatcher(); // TODO: why?

    let video: HTMLVideoElement;
    let stream: MediaStream | null = null;
    let isDialogOpen = true;
    let canCapture = false;
    let capturedImageUrl: string | null = null;
    let showCapturedView = false;

    // Function to initialize the camera stream
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (video) {
                video.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing the camera:", err);
        }
    }

    // Initialize camera when component mounts
    onMount(() => {
        startCamera();
    });

    function closeDialog() {
        isDialogOpen = false;
        canCapture = true;
    }

    function captureImage() {
        if (!canCapture) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0);
        capturedImageUrl = canvas.toDataURL('image/jpeg');

        const id = 'user_picture_' + $page.params.slug;
		localStorage.setItem(id, capturedImageUrl);

        showCapturedView = true; // Switch to captured view
        // dispatch('imageCaptured', capturedImageUrl); // TODO: why?
    }

    function continueAction() {
        console.log("Learn more button clicked");

        if (!$found_ids.includes($page.params.slug))
        {
            $found_ids = [...$found_ids, $page.params.slug];
        }
        goto(`/place/${$page.params.slug}`)
    }

    function retakePicture() {
        showCapturedView = false;  // Return to camera view
        canCapture = true;
        startCamera();  // Restart the camera
    }
</script>

<!-- Main container -->
<div class="camera-container">
    {#if !showCapturedView}
        <!-- Normal camera view with reference image -->
        <video bind:this={video} autoplay playsinline></video>
        
        <div class="reference-image">
            <img src="/img/2.jpg" alt="Reference image" />
            <div class="expand-icon" class:isDialogOpen>↗</div>
            <div class="arrow"></div>
        </div>
        
        {#if isDialogOpen}
            <div class="dialog-overlay">
                <div class="dialog-content">
                    <p>To get access to the very exciting information about this monument you need to take an almost identical image of the historical one above</p>
                    <div class="button-container">
                        <button class="btn" on:click={closeDialog}>Got it!</button>
                    </div>
                </div>
            </div>
        {/if}

        <div class="camera-bg"></div>

        <div class="camera-controls" class:active={canCapture}>
            <button on:click={captureImage} class="capture-btn" disabled={!canCapture}>
                <div class="capture-btn-inner"></div>
            </button>
        </div>
    {/if}

    {#if showCapturedView}
        <!-- Captured view with Well done! text, captured image, and reference image -->
        <div class="captured-view">
            <p class="well-done-text">Well done!</p>

            <div class="captured-image-container">
                <img src={capturedImageUrl} alt="Captured image" class="captured-image" />
            </div>

            <div class="reference-image-bottom">
                <img src="/img/2.jpg" alt="Reference image" />
            </div>

            <div class="button-container-captured">
                <button on:click={retakePicture} class="retake-btn">Retake Picture</button>
                <button on:click={continueAction} class="continue-btn">Learn more</button>
            </div>
        </div>
    {/if}
</div>

<style>
    .camera-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        /* height: 100%; */
        bottom: 0;
        top: 51px;
        background-color: black;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .reference-image {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 100px;
        height: 100px;
        border: 2px solid white;
        border-radius: 10px;
        /* overflow: hidden; */
        z-index: 2;
    }

    .reference-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .expand-icon {
        position: absolute;
        bottom: -34px;
        color: white;
        font-size: 26px;
        left: -28px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        animation: arrow-move 1s linear infinite;
        display: none;
    }

    .expand-icon.isDialogOpen {
        display: block;
    }

    @keyframes arrow-move {
        0% {
            transform: translate(0, 0);
        }


        50% {
            transform: translate(-4px, 4px);
        }


        100% {
            transform: translate(0, 0);
        }
    }

    .arrow {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 20px solid white;
        display: none;
    }

    .dialog-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 80%;
        text-align: center;
    }

    .button-container {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }

    .camera-bg {
        background-color: #00000090;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 102px;
    }

    .camera-controls {
        position: absolute;
        bottom: 16px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }

    .camera-controls.active {
        opacity: 1;
    }

    .capture-btn {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .capture-btn-inner {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background-color: white;
        transition: all 0.3s ease;
    }

    .capture-btn:not(:disabled):hover .capture-btn-inner {
        width: 50px;
        height: 50px;
    }

    .capture-btn:disabled {
        cursor: not-allowed;
    }

    .captured-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: white;
    }

    .well-done-text {
        color: #333;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
    }

    .captured-image-container {
        width: 90%;
        height: 40%;
        border-radius: 10px;
        border: 3px solid #ddd;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
        background-color: var(--accent);
    }

    .captured-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin: auto;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
    }

    .reference-image-bottom {
        width: 90%;
        height: 40%;
        border-radius: 10px;
        border: 3px solid #ddd;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
        background-color: var(--accent);
    }

    .reference-image-bottom img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        margin: auto;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
    }

    .button-container-captured {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: 20px;
    }

    .retake-btn, .continue-btn {
        background-color: #b5d4f5;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        border: none;
        padding: 15px 30px;
        border-radius: 30px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin: 0 10px;
    }

    .retake-btn:hover, .continue-btn:hover {
        background-color: #a4c3e5;
    }
</style>