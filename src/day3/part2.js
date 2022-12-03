import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day3.txt', import.meta.url), 'r')


function charToPriority(char) {
  const charCode = char.charCodeAt(0)
  return charCode < 97 ? charCode - 38 : charCode - 96
}

function compare(a, b) {
  return a - b;
}

function intersect(a, b) {
  let ai, bi = 0
  const result = new Set()
  while(ai < a.length && bi < b.length) {
    if(a[ai] === b[bi]) {
      result.add(a[ai])
      ai++
      bi++
    } else if(a[ai] < b[bi]) {
      ai++
    } else {
      bi++
    }
  }
  return new Set([...a].filter(x => b.has(x)))
}

let currentGroup = []
let totalPriority = 0
for await (const line of file.readLines()) {
  currentGroup.push(line.split(''))
  if(currentGroup.length < 3) {
    continue
  }
  
  const [rucksackA, rucksackB, rucksackC] = [
    new Set(currentGroup[0].map(charToPriority).sort(compare)),
    new Set(currentGroup[2].map(charToPriority).sort(compare)),
    new Set(currentGroup[1].map(charToPriority).sort(compare)),
  ];
  
  intersect(intersect(rucksackA, rucksackB), rucksackC).forEach(priority => totalPriority += priority)
  currentGroup = []
}

console.log(`Part 2: total priority is ${totalPriority}`)
