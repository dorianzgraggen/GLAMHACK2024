import { writable } from "svelte/store";

export const pictures_index = writable(0);

export const latitude = writable(0);
export const longitude = writable(0);
export const gps_accuracy = writable(0);
