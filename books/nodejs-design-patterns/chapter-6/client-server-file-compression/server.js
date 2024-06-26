// Create a received_files folder

import { createServer } from 'http'
import { createWriteStream } from 'fs'
import { createGunzip } from 'zlib'
import path, { basename, join } from 'path'

const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    const destFilename = join(__dirname ,'received_files', filename)
    console.log(`File request received: ${filename}`)

    req.pipe(createGunzip()).pipe(createWriteStream(destFilename)).on('finish', () => {
        res.writeHead(201, { 'Content-Type': 'text/plain' })
        res.end('OK\n')
        console.log(`File saved: ${destFilename}`)
    })
})

server.listen(3000, () => console.log('Listening on http:// localhost:3000'))