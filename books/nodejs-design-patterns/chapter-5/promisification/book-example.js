// How to create a promise around a function (randomBytes in this case)
// The function needs to be passed as a callback function, callbackBasedApi in the code (Node.js-style callback-based functions)

const { randomBytes } = require('crypto')

// Declare function
function promisify(callbackBasedApi) {
    return function promisified(...args) {
        return new Promise((resolve, reject) => {
            // Added custom setTimeout for async testing
            setTimeout(() => {
                const newArgs = [
                    ...args,
                    function (err, result) {
                        if (err) {
                            return reject(err)
                        }
                        resolve(result)
                    }]
                callbackBasedApi(...newArgs)
            }, 1000)
        })
    }
}

// Call function
const randomBytesP = promisify(randomBytes)
randomBytesP(32).then(buffer => { console.log(`Random bytes: ${buffer.toString()} / ${buffer}`) })