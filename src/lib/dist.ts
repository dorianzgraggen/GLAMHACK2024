// Function to convert degrees to radians
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Function to calculate distance between two GPS coordinates using the Haversine formula
 * @param current_lat 
 * @param current_lon 
 * @param spot_lat 
 * @param spot_lon 
 * @returns distance in meters
 */
export function calculateDistance(current_lat: number, current_lon: number, spot_lat: number, spot_lon: number): number {
    const R = 6371; // Radius of the Earth in km
    const lat1 = toRadians(current_lat);
    const lon1 = toRadians(current_lon);
    const lat2 = toRadians(spot_lat);
    const lon2 = toRadians(spot_lon);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000 ; 
    return distance;
}

export function getSteps(distance: number): number {
    return Math.floor(distance / 0.75);
}