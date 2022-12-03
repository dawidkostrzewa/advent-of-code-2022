// TASK: https://adventofcode.com/2022/day/1

const fs = require('fs');

fs.readFile('input-3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const allRucksack = data.split("\n")
   
    const convertedRucksas = allRucksack.map(r => {
        const list = r.split("")
        const middleIndex = Math.ceil(list.length / 2);

        const firstHalf = list.splice(0, middleIndex);
        const secondHalf = list.splice(-middleIndex);

        return [firstHalf, secondHalf]

    })


  const commons =  convertedRucksas.map(r => {
        const p1ASCI = r[0].map(i => i.charCodeAt(0))
        const p2ASCI = r[1].map(i => i.charCodeAt(0))
        const intersection = p1ASCI.filter(element => p2ASCI.includes(element))[0];

        if(intersection >=65 && intersection < 97) {
            return intersection - 38
        }

        if(intersection >= 97) {
            return intersection - 96
        }
       
    })

    console.log(commons.reduce((a, b) => a + b, 0));
});

// a - 1 ASCI 97

// A - 27  ACSCI 65