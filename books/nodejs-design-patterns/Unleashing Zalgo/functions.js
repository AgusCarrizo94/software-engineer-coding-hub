import { readFile, readFileSync } from 'fs'

const cache = new Map()

function consistentReadAsync(filename, callback) {
    if (cache.has(filename)) {
        // deferred callback invocation 
        process.nextTick(() => callback(cache.get(filename)))
    } else {
        // asynchronous function    
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            callback(data)
        })
    }
}

function consistentReadSync(filename) {
    if (cache.has(filename)) {
        return cache.get(filename)
    } else {
        const data = readFileSync(filename, 'utf8')
        cache.set(filename, data)
        return data
    }
}

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
    consistentReadAsync(filename, value => {
        listeners.forEach(listener => listener(value))
    })
    return { onDataReady: listener => listeners.push(listener) }
}