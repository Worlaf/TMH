import { resolveCountableRu } from "./resolveCountableRu";

export function resolveDurationRu(durationInMinutes: number) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const minuteString = `${minutes} ${resolveMinuteCountableRu(minutes)}`;

    return hours > 0 ? `${hours} ${resolveHourCountableRu(hours)} ${minuteString}` : minuteString;
}

export function resolveMinuteCountableRu(minutes: number) {
    return resolveCountableRu(minutes, "минута", "минуты", "минут");
}

export function resolveHourCountableRu(hours: number) {
    return resolveCountableRu(hours, "час", "часа", "часов");
}
