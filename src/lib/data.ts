import raw_csv from "../data.csv?raw"

const lines = raw_csv.split(/\r?\n/).filter((l) => l.length > 6);
lines.shift();

export const database = lines.map(line => {
    console.log("line", line)
    const l = line.split(";")
    console.log("l", l);
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