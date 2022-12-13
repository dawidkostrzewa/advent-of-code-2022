// TASK: https://adventofcode.com/2022/day/13

const fs = require('fs');


fs.readFile('input-13.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const pairs = data.split("\n\n").map(x=>x.split("\n")).map(x=>x.map(i => JSON.parse(i)))
    // console.log(pairs)
    pairs.forEach(pair => {
        const [p1, p2] = pair
        

    })
});
