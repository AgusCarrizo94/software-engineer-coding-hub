import { EventEmitter } from 'events'

class FindRegex extends EventEmitter {
    constructor(regex) {
        super()
        this.regex = regex
        this.files = []
    }

    addFile(file) {
        this.files.push(file)
        // RETURning this in a class fucntions allows function chaining
        return this
    }
}

new FindRegex(/hello \w+/).addFile('fileA.txt').addFile('fileB.json')