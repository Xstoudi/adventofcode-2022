import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day5.txt', import.meta.url), 'r')

const cratesStacks = []
let parseStep = 0
for await (const line of file.readLines()) {
    const lineParts = line.split(' ')

    if(line === '') {
        parseStep++
        continue
    }
    if(line.trimStart()[0] === '1') continue

    if(parseStep === 0) {
        const slots = []
        let emptyCounter = 0
        for(let i = 0; i < lineParts.length; i++) {
            if(lineParts[i] === '') {
                emptyCounter++
                continue
            }
            if(emptyCounter >= 4) {
                for(let j = 0; j < emptyCounter / 4; j++)
                    slots.push(null)
                emptyCounter = 0
            }
            slots.push(lineParts[i][1])   
        }
        if(emptyCounter === 4) slots.push(null)
        slots.forEach((crate, index) => {
            if(crate === null) return
            if(cratesStacks[index] === undefined) cratesStacks[index] = []
            cratesStacks[index].unshift(crate)
        })
        continue
    }

    const count = parseInt(lineParts[1])
    const from = parseInt(lineParts[3]) - 1
    const to = parseInt(lineParts[5]) - 1

    // remove from
    const fromStack = cratesStacks[from].splice(cratesStacks[from].length - count, count)

    // add to
    cratesStacks[to].push(...fromStack)
}

const solution = cratesStacks
    .map((stack) => 
        stack.length > 0 ? stack[stack.length - 1] : ''
    )
    .join('')

console.log(`Part 2: ${solution}`)