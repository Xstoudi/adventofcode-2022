import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day9.txt', import.meta.url), 'r')

const moves = []

let knotCount = 10
let knots = []
for(let i = 0; i < knotCount; i++) {
  knots.push([0, 0])
}

function chessboardDistance([x1, y1], [x2, y2]) {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
}

function manhattanDifference([x1, y1], [x2, y2]) {
  return [x1 - x2, y1 - y2]
}

const tailPositions = new Set(['0,0'])

for await (const line of file.readLines()) {
  let xFactor = 0
  let yFactor = 0
  switch(line[0]) {
    case 'U':
      yFactor = 1
      break
    case 'D':
      yFactor = -1
      break
    case 'L':
      xFactor = -1
      break
    case 'R':
      xFactor = 1
      break
  }

  const move = Number(line.split(' ')[1])

  for(let i = 0; i < move; i++) {
    knots[0] = [knots[0][0] + xFactor, knots[0][1] + yFactor]
    for(let i = 0; i < knots.length - 1; i++) {
      const front = knots[i]
      let back = knots[i + 1]
      while(chessboardDistance(front, back) > 1) {
        // même columne : rapproche y
        // même ligne : rapproche x
        // sinon, rapproche x et y

        let tailX = 0
        let tailY = 0

        const diffWithTail = manhattanDifference(front, back)
        if(diffWithTail[0] === 0) {
          tailY = Math.sign(diffWithTail[1])
        } else if(diffWithTail[1] === 0) {
          tailX = Math.sign(diffWithTail[0])
        } else {
          tailX = Math.sign(diffWithTail[0])
          tailY = Math.sign(diffWithTail[1])
        }
        
        back = [back[0] + tailX, back[1] + tailY]
      }
      knots[i + 1] = back
    }
    const tail = knots[knots.length - 1]
    tailPositions.add(`${tail[0]},${tail[1]}`)
  }
}

console.log(`Part 2: tail went to ${tailPositions.size} different positions`)