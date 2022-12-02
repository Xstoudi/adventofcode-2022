import { open } from 'node:fs/promises';

const file = await open(new URL('../../inputs/day2.txt', import.meta.url), 'r');

let myScore = 0
for await (const line of file.readLines()) {
    const [a, b] = line.split(' ');
    const [aChoice, bChoice] = [a.charCodeAt(0) - 65, b.charCodeAt(0) - 88];

    // 0 -> draw
    // 1 -> a wins
    // 2 -> b wins
    const outcome = (aChoice - bChoice + 3) % 3;

    myScore += (outcome === 2 ? 6 : outcome === 0 ? 3 : 0) + (bChoice + 1);
}
console.log(`Part 1: your scored ${myScore}`)