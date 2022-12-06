import { createReadStream } from 'node:fs'
import { open } from 'node:fs/promises'

async function* readChars() {
    const file = await open(new URL('../../inputs/day6.txt', import.meta.url), 'r')
    const buffer = Buffer.alloc(1)
    while ((await file.read(buffer, 0, 1)).bytesRead > 0) {
        yield buffer.toString()
    }
    file.close()
}

const lastFour = []
let lastFourCircularIndex = 0
let result = 0
for await (const char of readChars()) {
    lastFour[(lastFourCircularIndex++) % 4] = char
    if(lastFour.length === 4 && lastFour.filter((item, index) => lastFour.indexOf(item) !== index).length === 0) {
        result = lastFourCircularIndex
        break;
    }

}

console.log(`Part 1: marker is at ${result}`)
