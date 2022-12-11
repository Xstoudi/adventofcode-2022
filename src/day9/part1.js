import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day9.txt', import.meta.url), 'r')

const moves = []

let head = [0, 0]
let tail = [0, 0]

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
    head = [head[0] + xFactor, head[1] + yFactor]

    const diffWithHead = chessboardDistance(head, tail)
    while(chessboardDistance(head, tail) > 1) {
      // même columne : rapproche y
      // même ligne : rapproche x
      // sinon, rapproche x et y

      let tailX = 0
      let tailY = 0

      const diffWithTail = manhattanDifference(head, tail)
      if(diffWithTail[0] === 0) {
        tailY = Math.sign(diffWithTail[1])
      } else if(diffWithTail[1] === 0) {
        tailX = Math.sign(diffWithTail[0])
      } else {
        tailX = Math.sign(diffWithTail[0])
        tailY = Math.sign(diffWithTail[1])
      }
      
      tail = [tail[0] + tailX, tail[1] + tailY]
      tailPositions.add(`${tail[0]},${tail[1]}`)
    }
    console.log(head, tail, chessboardDistance(head, tail))
  }

}

console.log(`Part 1: tail went to ${tailPositions.size} different positions`)