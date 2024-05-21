// Upload a file a to the "client-server-file-compression" folder and pass it as an argument in the cli
// The second argument should be the server host (localhost)
// Before running the cli, run teh server.js file

import { request } from 'http'
import { createGzip } from 'zlib'
import { createReadStream } from 'fs'
import { basename } from 'path'

const filename = process.argv[2]
const serverHost = process.argv[3]

const httpRequestOptions = {
    hostname: serverHost,
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip',
        'X-Filename': basename(filename)
    }
}

const req = request(httpRequestOptions, (res) => {
    console.log(`Server response: ${res.statusCode}`)
})

createReadStream(filename).pipe(createGzip()).pipe(req).on('finish', () => { console.log('File successfully sent') })