import { writable } from "svelte/store";

export const pictures_index = writable(0);

export const latitude = writable(0);
export const longitude = writable(0);
export const gps_accuracy = writable(0);


export const pinned_place_id = writable("");

export const found_ids = writable<Array<string>>(["3","4","6"]);