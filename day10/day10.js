// TASK: https://adventofcode.com/2022/day/10

const fs = require('fs');

fs.readFile('input-10.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data.split("\n").length)
    const cycles = data.split("\n").map(x => x.split(" ")).map(cycle => {
        const [operation, valueToChange] = cycle
        // console.log(cycle)
        if (operation === "addx") {
            return [["addx", 0], ["addx", parseInt(valueToChange)]]
        }
        return operation
    }).flat()

    console.log(cycles.length)

    let value = 1

    const cyclesArr = []
    let i = 1
    cycles.forEach((cycle) => {
        if (cycle === "noop") {
            // console.l   og("")
            // i++;
        }

        

        if (i == 20) {
            cyclesArr.push(value*20)
        }
        if (i == 60) {
            cyclesArr.push(value*60)
        }
        if (i == 100) {
            cyclesArr.push(value*100)
        }
        if (i == 140) {
            cyclesArr.push(value*140)
        }
        if (i == 180) {
            cyclesArr.push(value*180)
        }
        if (i == 220) {
            cyclesArr.push(value*220)
        }

        if (cycle && cycle[0] == 'addx') {
            value += cycle[1]
        }
        i++;
        console.log(i)

    })

    console.log(cyclesArr.reduce((a, b) => a + b, 0))


    // for (let i = 0; i < cycles.length; i++) {
    //     const cycle = cycles[i];
    //     const [operation, valueToChange] = cycle
    //     if (operation === "noop") {
    //         continue
    //     }
    //     if (operation === "addx") {
    //         value += parseInt(valueToChange)
    //     }

    // }
});
