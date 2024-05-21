const tasks = [...Array(20000)].map((_, i) => i + 1)

const start = performance.now()
console.log("Start: ", start)

// This is sequential because its recursive
function iterate(index) {
    if (index === tasks.length) {
        return finish()
    }
    console.log("Iteration number ", index)
    iterate(index + 1)
}

function finish() {
    // iteration completed
    const end = performance.now()
    console.log("End: ", end)

    console.log("Time it took to execute the sequential iteration: ", end - start)
}

iterate(0)