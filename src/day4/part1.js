import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day4.txt', import.meta.url), 'r')

let fullyContainCount = 0
for await (const line of file.readLines()) {
  const [rangeA, rangeB] = line.split(',').map(range => range.split('-').map(Number))
  if(
    rangeA[0] >= rangeB[0] &&
    rangeA[1] <= rangeB[1] ||
    rangeA[0] <= rangeB[0] &&
    rangeA[1] >= rangeB[1]
  ) fullyContainCount++
}

console.log(`Part 1: full overlap on ${fullyContainCount} pairs`)
