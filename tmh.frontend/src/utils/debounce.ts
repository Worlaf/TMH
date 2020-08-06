const timeouts: { [key: string]: number | undefined } = {};

export default function debounce(callback: () => void, delayInMs: number) {
    const key = callback.toString();

    if (timeouts[key]) {
        console.log("clear timeout", timeouts[key]);
        clearTimeout(timeouts[key]);

        timeouts[key] = undefined;
    }

    timeouts[key] = setTimeout(callback as TimerHandler, delayInMs);
    console.log("set timeout", timeouts[key]);
}
