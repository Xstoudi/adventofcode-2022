import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day8.txt', import.meta.url), 'r')

const forest = []
for await (const line of file.readLines()) {
  forest.push(line.split('').map(Number))
}

const width = forest[0].length
const height = forest.length

const bigbois = new Set()

let currentTallest = -1

function tree(x, y) {
  const height = forest[y][x]
  if(height > currentTallest) {
    currentTallest = height
    bigbois.add(`${x},${y}`)
  }
}

for(let i = 0; i < height; i++) {
  // < left
  currentTallest = -1
  for(let j = 0; j < width; j++) {
    tree(j, i)
  }

  // > right
  currentTallest = -1
  for(let j = width - 1; j >= 0; j--) {
    tree(j, i)
  }
}

for(let i = 0; i < width; i++) {
  // ^up
  currentTallest = -1
  for(let j = 0; j < height; j++) {
    tree(i, j)
  }

  // v down
  currentTallest = -1
  for(let j = height - 1; j >= 0; j--) {
    tree(i, j)
  }
}

console.log(`Part 1: there is ${bestScenicScore} big trees`)