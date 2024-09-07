import raw_csv from "../data-new.csv?raw"
import type { Place } from "$lib/types"

const lines = raw_csv.split(/\r?\n/).filter((l) => l.length > 6);
lines.shift();


export const database: Array<Place> = lines.map(line => {
    const l = line.split(";")
    return {
        id: l[0],
        title: l[1],
        description: l[2],
        longitude: Number(l[3]),
        latitude: Number(l[4]),
        images: l[5].split(","),
        distance: 0,
    }
})