import { open } from 'node:fs/promises'

const file = await open(new URL('../../inputs/day7.txt', import.meta.url), 'r')

function computeSize(node) {
    if (node.type === 'file') {
        return node.size
    }

    let size = 0
    for (const child of node.children) {
        size += computeSize(child)
    }

    node.size = size
    return size
}

function getDirs(node) {
    const dirs = []
    if (node.type === 'dir') {
        dirs.push(node)
    }
    for (const child of node.children || []) {
        dirs.push(...getDirs(child))
    }
    return dirs
}

const tree = {
    name: '',
    type: 'dir',
    children: []
}
let currentPath = '/'
let lsSteps = -1
for await (const line of file.readLines()) {
    const lineParts = line.split(' ')
    if (lsSteps > -1) {
        if(lineParts[0] !== '$') {
            const type = lineParts[0] === 'dir' ? 'dir' : 'file'
            const name = lineParts[1]
            
            let found = false
            while (!found) {
                const pathParts = currentPath.split('/').slice(1)
                let current = tree
                for (const pathPart of pathParts) {
                    let savedCurrent = current
                    current = current.children.find(child => child.name === pathPart)
                    if(current === undefined) {
                        current = savedCurrent
                    }
                }

                current.children.push({
                    name,
                    type,
                    [type === 'dir' ? 'children' : 'size']: type === 'dir' ? [] : parseInt(lineParts[0], 10)
                })

                found = true
            }
        }
    }

    if(lineParts[0] === '$') {
        if(lineParts[1] === 'cd') {
            if (lineParts[2] === '/') {
                currentPath = '/'
            } else if (lineParts[2] === '..') {
                currentPath = currentPath.split('/').slice(0, -1).join('/') || '/'
            } else {
                currentPath = currentPath + '/' + lineParts[2]
            }
        } else if (lineParts[1] === 'ls') {
            lsSteps = 0
        }
    }
}

computeSize(tree)

const dirs = getDirs(tree)

const totalDisk = 70000000
const updateSize = 30000000
const usedDisk = dirs.find(dir => dir.name === '').size
const remainingDisk = totalDisk - usedDisk
const neededSize = updateSize - remainingDisk

const result = dirs
    .sort((a, b) => a.size - b.size)
    .find(dir => dir.size > neededSize)

console.log(`Part 2: Deleting folder of size ${result.size}`)
