export function randomNumber(max: number) : number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function randomCoord(map: string[]): number[] {
    const randomBetween = (max: number) => randomNumber(max) + 1

    const randomY = randomBetween(map.length - 1)
    const randomX = randomBetween(map[randomY].length - 1)
    return [randomY, randomX]
}

