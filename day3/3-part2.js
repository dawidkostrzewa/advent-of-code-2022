// TASK: https://adventofcode.com/2022/day/3

const fs = require('fs');

fs.readFile('input-3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const allRucksack = data.split("\n")

    const grouped = allRucksack.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 3)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] 
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    console.log(grouped)

    const convertedRucksas = allRucksack.map(r => {
        const list = r.split("")
        const middleIndex = Math.ceil(list.length / 2);

        const firstHalf = list.splice(0, middleIndex);
        const secondHalf = list.splice(-middleIndex);

        return [firstHalf, secondHalf]

    })

    const groupedToASCI = grouped.map(g => {
        const p1ASCI = g[0].split("").map(i => i.charCodeAt(0))
        const p2ASCI = g[1].split("").map(i => i.charCodeAt(0))
        const p3ASCI = g[2].split("").map(i => i.charCodeAt(0))


        return [p1ASCI, p2ASCI, p3ASCI]
    })


    const commons = groupedToASCI.map(r => {
        const a1 = r[0]
        const a2 = r[1]
        const a3 = r[2]
        const all = [a1, a2, a3]
        const result = all.reduce((a, b) => a.filter(c => b.includes(c)))[0];
        if (result >= 65 && result < 97) {
            return result - 38
        }

        if (result >= 97) {
            return result - 96
        }
    })




    console.log(commons.reduce((a, b) => a + b, 0));
});

// a - 1 ASCI 97

// A - 27  ACSCI 65