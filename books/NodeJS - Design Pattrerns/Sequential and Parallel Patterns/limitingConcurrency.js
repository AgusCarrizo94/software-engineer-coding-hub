// const tasks = [...Array(10)].map((_, i) => i + 1)

// const start = performance.now()
// console.log("Start: ", start)

// const concurrency = 2
// let running = 0
// let completed = 0
// let index = 0

// function next() {
//     console.log("Waiting for execution. Current threads running: ", running + 1)
//     while (running < concurrency && index < tasks.length) {
//         const task = tasks[index++]

//         console.log(`Iteration number: ${task}. Running on thread number: ${running + 1}`)

//         setTimeout(() => {
//             console.log(`Iteration number ${task} finished.`)

//             if (++completed === tasks.length) {
//                 return finish()
//             }

//             next()
//             running--
//         }, [Math.random() * 10000])

//         running++
//     }
// }

// next()

// function finish() {
//     // iteration completed
//     const end = performance.now()
//     console.log("End: ", end)

//     console.log("Time it took to execute the sequential iteration: ", end - start)
// }

const tasks = []

// Populate tasks array with example tasks
for (let i = 0; i < 10; i++) {
    tasks.push((callback) => {
        console.log(`Task ${i + 1}`)
        // Simulate asynchronous operation
        setTimeout(() => {
            console.log(`Task ${i + 1} completed`);
            callback();
        }, Math.random() * 10000); // Random timeout for simulation
    });
}

const concurrency = 2
let running = 0
let completed = 0
let index = 0
function next() {
    while (running < concurrency && index < tasks.length) {
        const task = tasks[index++]
        task(() => {
            if (++completed === tasks.length) {
                return finish()
            }
            running--
            next()
        })
        running++
    }
}
next()
function finish() { console.log('finish') }