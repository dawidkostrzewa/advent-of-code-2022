// TASK: https://adventofcode.com/2022/day/4

const fs = require('fs');

fs.readFile('input-4.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const allPairs = data.split("\n")

    const convertedPairs = allPairs.map(p => {
        return p.split(",").map(i => i.split("-"))
    })


    let sumFullyContains = 0;
    let sumOverlaps = 0;
    convertedPairs.forEach(p => {
        const pair1 = p[0].map(i => parseInt(i))
        const pair2 = p[1].map(i => parseInt(i))

        // PART-1 fully contains 
        if ((+pair2[0] >= +pair1[0] && +pair2[1] <= +pair1[1]) || (+pair2[0] <= +pair1[0] && +pair2[1] >= +pair1[1])) {
            sumFullyContains++;
        }

        // PART-2 overlaps
        if (Math.max(pair1[0], pair2[0]) <= Math.min(pair1[1], pair2[1])) {
            sumOverlaps++;
        }
    })

    console.log(sumFullyContains);
    console.log(sumOverlaps)

});
