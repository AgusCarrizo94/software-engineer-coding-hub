// Page 74

const { readFile } = require('fs')

function readJSON(filename, callback) {
    readFile(filename, 'utf-8', (err, data) => {
        let parsed;
        if (err) {
            return callback(err)
        }

        try {
            parsed = JSON.parse(data)
        } catch (err) {
            return callback(err)
        }

        callback(null, parsed)
    })
}

function readJSONThrow(filename, callback) {
    readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }

        callback(null, JSON.parse(data))
    })
}


try {
    readJSONThrow('test.json', (err) => console.log(err))
} catch (error) {
    console.log('This will NOT catch the JSON parsing exception')
}