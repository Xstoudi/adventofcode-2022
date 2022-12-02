import { open } from 'node:fs/promises';

const file = await open(new URL('../../inputs/day2.txt', import.meta.url), 'r');

let myScore = 0

for await (const line of file.readLines()) {
    const [a, b] = line.split(' ');
    const [aChoice, wantedOutcome] = [a.charCodeAt(0) - 65, b.charCodeAt(0) - 88];

    const bChoice = [(aChoice + 2) % 3, aChoice, (aChoice + 1) % 3][wantedOutcome];
    myScore += [0, 3, 6][wantedOutcome] + bChoice + 1;
}

console.log(`Part 2: your scored ${myScore}`)