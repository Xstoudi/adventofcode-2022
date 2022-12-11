import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day11.txt', import.meta.url), 'r')

const monkeys = []

let currentMonkey = { items: [], operation: null, predicate: null, true: 0, false: 0, inspections: 0 }
for await (const line of file.readLines()) {
  if(line.startsWith('Monkey') || line === '') {
    continue
  }

  if(line.startsWith('  Starting items')) {
    line.split(': ')[1].split(', ').forEach(item => currentMonkey.items.push(Number(item)))
  }
  if(line.startsWith('  Operation')) {
    const [to, eq, x, op, y] = line.split(': ')[1].split(' ')
    currentMonkey.operation = (old) => {
      const a = x === 'old' ? old : Number(x)
      const b = y === 'old' ? old : Number(y)
      return op === '+' ? a + b : a * b
    }
  }
  if(line.startsWith('  Test')) {
    const arg = Number(line.split('divisible by ')[1])
    currentMonkey.predicate = op => op % Number(arg) === 0
  }
  if(line.startsWith('    If true')) {
    currentMonkey.true = Number(line.split('throw to monkey ')[1])
  }

  if(line.startsWith('    If false')) {
    currentMonkey.false = Number(line.split('throw to monkey ')[1])

    monkeys.push(currentMonkey)
    currentMonkey = { items: [], operation: x => x, predicate: x => x, true: 0, false: 0, inspections: 0 }
    continue
  }
}

const roundsCount = 20

for(let round = 0; round < roundsCount; round++) {
  for(let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    monkey.items
      .splice(0, monkey.items.length)
      .map(monkey.operation)
      .map(x => Math.floor(x / 3))
      .forEach(x => {
        if(monkey.predicate(x)) monkeys[monkey.true].items.push(x)
        else monkeys[monkey.false].items.push(x)
        monkey.inspections++
      })
  }
}
const monkeyBusiness = monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a).splice(0, 2).reduce((a, b) => a * b)
console.log(`Part 1: monkey business level is ${monkeyBusiness}`)