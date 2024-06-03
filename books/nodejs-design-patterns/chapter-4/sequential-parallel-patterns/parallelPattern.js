// Page 108

const tasks = [...Array(20000)].map((_, i) => i + 1)

const start = performance.now()
console.log("Start: ", start)

let completed = 0
tasks.forEach(item => {
    // if (item) {
    //     setTimeout(() => {
    //         console.log("Times async task was executed", item)
    //     }, [1000])
    // }
    console.log("Iteration number: ", item)
    if (++completed === tasks.length) {
        finish()
    }
})

function finish() {
    // iteration completed
    const end = performance.now()
    console.log("End: ", end)

    console.log("Time it took to execute the parallel iteration: ", end - start)
}