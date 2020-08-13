const timeouts: { [key: string]: number | undefined } = {};

// replace with lodash's implementation
export default function debounce(callback: () => void, delayInMs: number) {
    const key = callback.toString();

    if (timeouts[key]) {
        clearTimeout(timeouts[key]);

        timeouts[key] = undefined;
    }

    timeouts[key] = setTimeout(callback as TimerHandler, delayInMs);
}
