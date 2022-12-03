import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day3.txt', import.meta.url), 'r')


function charToPriority(char) {
  const charCode = char.charCodeAt(0)
  return charCode < 97 ? charCode - 38 : charCode - 96
}

function compare(a, b) {
  return a - b;
}

function intersect(a, b) {
  return new Set([...a].filter(x => b.has(x)))
}

let totalPriority = 0
for await (const line of file.readLines()) {
  const [compartmentA, compartmentB] = [
    new Set(line.substring(0, line.length / 2).split('').map(charToPriority).sort(compare)),
    new Set(line.substring(line.length / 2).split('').map(charToPriority).sort(compare))
  ];
  
  intersect(compartmentA, compartmentB).forEach(priority => totalPriority += priority)
}
console.log(`Part 1: total priority is ${totalPriority}`)