import { readFile } from 'fs'

const cache = new Map()

function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // invoked synchronously  
        cb(cache.get(filename))
    } else {
        // asynchronous function    
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            cb(data)
        })
    }
}

export function createFileReader(filename) {
    const listeners = []
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value))
    })
    return { onDataReady: listener => listeners.push(listener) }
}