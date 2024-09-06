<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import { page } from '$app/stores';
	export let slug = $page.params.slug;

	import { database } from '$lib/data';

	const place = database.find(e => e.id == slug)

</script>

<h1>{slug}</h1>
<div>{place?.title}</div>

