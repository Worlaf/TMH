export function decomposeDuration(durationInMinutes: number) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return {
        hours,
        minutes,
    };
}

export function resolveShortDurationString(durationInMinutes: number) {
    const { hours, minutes } = decomposeDuration(durationInMinutes);

    return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
}
