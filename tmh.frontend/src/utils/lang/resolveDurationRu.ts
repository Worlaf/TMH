import { resolveCountableRu } from "./resolveCountableRu";

export function resolveDurationRu(durationInMinutes: number) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const minuteString = `${minutes} ${resolveCountableRu(minutes, "минута", "минуты", "минут")}`;

    return hours > 0 ? `${hours} ${resolveCountableRu(hours, "час", "часа", "часов")} ${minuteString}` : minuteString;
}
