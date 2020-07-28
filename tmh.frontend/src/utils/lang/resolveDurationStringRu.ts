import { resolveCountableRu } from "./resolveCountableRu";
import { decomposeDuration } from "../time";

export function resolveDurationStringRu(durationInMinutes: number) {
    const { hours, minutes } = decomposeDuration(durationInMinutes);

    const minuteString = `${minutes} ${resolveMinuteCountableRu(minutes)}`;

    return hours > 0 ? `${hours} ${resolveHourCountableRu(hours)} ${minuteString}` : minuteString;
}

export function resolveMinuteCountableRu(minutes: number) {
    return resolveCountableRu(minutes, "минута", "минуты", "минут");
}

export function resolveHourCountableRu(hours: number) {
    return resolveCountableRu(hours, "час", "часа", "часов");
}
