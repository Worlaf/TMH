export function resolveCountableRu(count: number, singular: string, paucus: string, plural: string) {
    const acount = Math.abs(count % 100);
    if (acount === 0) return plural;

    if (acount === 1) return singular;

    if (acount > 1 && acount < 5) return paucus;

    if (acount >= 5 && acount <= 20) return plural;

    const reminder = acount % 10;
    if (reminder === 1) return singular;

    if (reminder > 1 && reminder < 5) return paucus;

    return plural;
}
