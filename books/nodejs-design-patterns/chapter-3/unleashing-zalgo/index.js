// Page 68

import { createFileReader } from './functions.js'

const reader1 = createFileReader('data.txt')
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`)

    // ...sometime later we try to read again from 
    // the same file
    const reader2 = createFileReader('data.txt')
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`)
    })
})