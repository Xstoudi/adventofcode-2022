import { open } from 'node:fs/promises';

const file = await open(new URL('../../inputs/day1.txt', import.meta.url), 'r');

const elvesCalories = []
for await (const line of file.readLines()) {
  if(line === '') elvesCalories.push(0)
  else elvesCalories[elvesCalories.length - 1] += parseInt(line)
}

const reversedElves = elvesCalories.sort((a, b) => b - a)

console.log(`Part 1: ${reversedElves[0]}`)
console.log(`Part 2: ${reversedElves.splice(0, 3).reduce((a, b) => a + b)}`)