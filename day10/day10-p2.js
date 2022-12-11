// TASK: https://adventofcode.com/2022/day/10

const fs = require('fs');

fs.readFile('input-10.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const cycles = data.split("\n").map(x => x.split(" ")).map(cycle => {
        const [operation, valueToChange] = cycle
        if (operation === "addx") {
            return [["addx", 0], ["addx", parseInt(valueToChange)]]
        }
        return operation
    }).flat()


    let value = 0

    const row = Array(240).fill(".");


    let i = 0
    cycles.forEach((cycle) => {

        if (i < 40) {
            if (i == value || i == value + 1 || i == value + 2) {
                row[i] = "#"
            }
        }
        if (i >= 40 && i < 80) {
            if (i - 40 == value || i - 40 == value + 1 || i - 40 == value + 2) {
                row[i] = "#"
            }
        }
        if (i >= 80 && i < 120) {
            if (i - 80 == value || i - 80 == value + 1 || i - 80 == value + 2) {
                row[i] = "#"
            }
        }
        if (i >= 120 && i < 160) {
            if (i - 120 == value || i - 120 == value + 1 || i - 120 == value + 2) {
                row[i] = "#"
            }
        }
        if (i >= 160 && i < 200) {
            if (i - 160 == value || i - 160 == value + 1 || i - 160 == value + 2) {
                row[i] = "#"
            }
        }
        if (i >= 200 && i < 240) {
            if (i - 200 == value || i - 200 == value + 1 || i - 200 == value + 2) {
                row[i] = "#"
            }
        }

        if (cycle && cycle[0] == 'addx') {
            value += cycle[1]
        }

        i++;

    })


    const row1 = row.slice(0, 40)
    const row2 = row.slice(40, 80)
    const row3 = row.slice(80, 120)
    const row4 = row.slice(120, 160)
    const row5 = row.slice(160, 200)
    const row6 = row.slice(200, 240)
    console.log(row1.join(""))
    console.log(row2.join(""))
    console.log(row3.join(""))
    console.log(row4.join(""))
    console.log(row5.join(""))
    console.log(row6.join(""))
});
