
// TASK: https://adventofcode.com/2022/day/5

const fs = require('fs');


fs.readFile('input-6.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const d = data.split("")
    console.log(d)

    function checkIfThereIsARepeatingLetter(data) {
       return [...new Set(data)].length === data.length
    }
   
    // PART 1 - first 4 letters needs to be different
    for(let i = 0; i < d.length-4; i++) {
        const data = d.slice(i, i+4)
        if (checkIfThereIsARepeatingLetter(data)) {
            console.log(data, i+4)
            break;
        }
    }

    // PART 2 - first 12 letters needs to be different
    for(let i = 0; i < d.length-14; i++) {
        const data = d.slice(i, i+14)
        if (checkIfThereIsARepeatingLetter(data)) {
            console.log(data, i+14)
            break;
        }
    }
});
