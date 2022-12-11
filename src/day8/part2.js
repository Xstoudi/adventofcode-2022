import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day8.txt', import.meta.url), 'r')

const forest = []
for await (const line of file.readLines()) {
  forest.push(line.split('').map(Number))
}

const width = forest[0].length
const height = forest.length

let bestScenicScore = 0

for(let i = 0; i < height; i++) {
  for(let j = 0; j < width; j++) {
    const siteHeight = forest[i][j]
    const viewDistances = [0, 0, 0, 0]

    // look left
    for(let k = j - 1; k >= 0; k--) {
      if(forest[i][k] < siteHeight) {
        viewDistances[0] += 1
      }
      if(forest[i][k] >= siteHeight) {
        viewDistances[0] += 1
        break
      }
    }

    // look right
    for(let k = j + 1; k <= width - 1; k++) {
      if(forest[i][k] < siteHeight) {
        viewDistances[1] += 1
      }
      if(forest[i][k] >= siteHeight) {
        viewDistances[1] += 1
        break
      }
    }

    // look up
    for(let k = i - 1; k >= 0; k--) {
      if(forest[k][j] < siteHeight) {
        viewDistances[2] += 1
      }
      if(forest[k][j] >= siteHeight) {
        viewDistances[2] += 1
        break
      }
    }

    // look down
    for(let k = i + 1; k <= height - 1; k++) {
      if(forest[k][j] < siteHeight) {
        viewDistances[3] += 1
      }
      if(forest[k][j] >= siteHeight) {
        viewDistances[3] += 1
        break
      }
    }

    console.log(viewDistances)

    const scenicScore = viewDistances.reduce((a, b) => a * b)
    if(scenicScore > bestScenicScore) {
      bestScenicScore = scenicScore
    }
  }
}

console.log(`Part 2: best scenic score is ${bestScenicScore}`)