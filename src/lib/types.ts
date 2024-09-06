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