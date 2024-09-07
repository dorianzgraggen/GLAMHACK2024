/*

export type Image = {
    Caption: string;
    File_name: string;
}

export type Place = {
    id: string;
    title: string;
    description: string;
    exists: boolean;
    longitude: number;
    latitude: number;
    images: Image[];
    distance: number;
};

*/

export type Place = {
    id: string;
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    images: string[];
    distance: number;
};


export enum GPSState {
    Unknown,
    Unsupported,
    Declined,
    Checking,
    Ready
}