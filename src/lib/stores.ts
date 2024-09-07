import { writable } from "svelte/store";
import { GPSState } from "./types";

export const pictures_index = writable(0);

export const latitude = writable(0);
export const longitude = writable(0);
export const gps_accuracy = writable(0);


export const pinned_place_id = writable("");

export const found_ids = writable<Array<string>>([]);

export const allowed_gps = writable<GPSState>(GPSState.Unknown);
export const ignore_distance_check = writable(false);