// Page 112

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