import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day10.txt', import.meta.url), 'r')

const screen = []
for(let i = 0; i < 6; i++) {
  screen.push([])
  for(let j = 0; j < 40; j++) {
    screen[i].push(false)
  }
}

const cpuStack = []
const registries = [1]
let currentOp = null

let nextCycleToWatch = 20

function cpuTick(cycle, during) {
  if(currentOp === null) {
    const [op, arg] = cpuStack.shift().split(' ')
    currentOp = { op, arg, remainCycle: op === 'addx' ? 1 : 0}
    console.log(`Start cycle  ${cycle}: begin executing ${op} ${arg}`)
  }
  during()
  if(currentOp.remainCycle === 0) {
    switch(currentOp.op) {
      case 'addx':
        registries[0] += Number(currentOp.arg)
    }
    currentOp = null
  } else {
    currentOp.remainCycle--
  }
}

for await (const line of file.readLines()) {
  cpuStack.push(line)
}

let crtPointer = 0

let cycle = 0
while(cpuStack.length > 0 || currentOp !== null) {
  cycle++

  if(cycle === nextCycleToWatch) {
    nextCycleToWatch += 40
  }
  cpuTick(cycle, () => {
    console.log(`During cycle ${cycle}: CRT draw pixel in position ${crtPointer}`)
    screen[Math.floor(crtPointer / 40) % 6][crtPointer % 40] = crtPointer % 40 === registries[0] || crtPointer % 40 === registries[0] + 1 || crtPointer % 40 === registries[0] - 1
    crtPointer++
  })
}

screen.forEach(line => console.log(line.map(cell => cell ? '#' : '.').join('')))
