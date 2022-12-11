import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day10.txt', import.meta.url), 'r')

const cpuStack = []
const registries = [1]
let currentOp = null

let signalStrengthCumulated = 0
let nextCycleToWatch = 20

function cpuTick() {
  if(currentOp === null) {
    const [op, arg] = cpuStack.shift().split(' ')
    currentOp = { op, arg, remainCycle: op === 'addx' ? 1 : 0}
  }
  console.log(currentOp)
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

let cycle = 0
while(cpuStack.length > 0 || currentOp !== null) {
  cycle++

  if(cycle === nextCycleToWatch) {
    signalStrengthCumulated += registries[0] * cycle
    nextCycleToWatch += 40
  }
  cpuTick()
  console.log(registries)
}

console.log(signalStrengthCumulated)