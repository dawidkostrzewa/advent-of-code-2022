// TASK: https://adventofcode.com/2022/day/5

const fs = require('fs');


fs.readFile('input-5.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const dataParsed = data.split("\n\n")

    const cratesString = dataParsed[0]
    const rulesString = dataParsed[1]


    const rules = rulesString.split("\n").map(r => {
        return r.split(" ").filter(i => !isNaN(i)).map(i => parseInt(i))
    });

    const rows = cratesString.split('\n');

    // Map each row string to an array of characters
    let cratesGrid = rows.map(row => row.match(/.{1,4}/g).map(c => c.replace(/\s/g, '')).map(x => x === '' ? 0 : x));
    // remove row with numbers
    cratesGrid.pop()
    console.table(cratesGrid)


    // console.log(rules.flat())
    // console.log(Math.max(...rules.flat()))
    const maxColumns = Math.max(...rules.flat())
    const currentColumnsCount = 8
    const ROWS = 9

    const missingColumns = maxColumns - currentColumnsCount
    console.log(missingColumns)

    for (let i = 0; i < missingColumns + 6; i++) {

        cratesGrid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }


    // [1,9,2]

    const move = 1;
    const from = 9;
    const to = 2;

    // const firstStep = 

    function showAllFromColumn(column) {
        const columns = []
        for (let i = 0; i < cratesGrid.length; i++) {
            // if(cratesGrid[i][] !== "") {
            columns.push(cratesGrid[i][column])
            // }
        }

        // console.log(columns)
        return columns
    }


    function getFromColumn(column, howMany) {
        const columns = []
        let notEmptyIndex = 0
        for (let i = 0; i < cratesGrid.length; i++) {
            if (cratesGrid[i][column] !== 0) {
                notEmptyIndex = i;
                break;
            }
        }

        for (let i = 0; i < howMany; i++) {
            columns.push(cratesGrid[notEmptyIndex + i][column])
            cratesGrid[notEmptyIndex + i][column] = 0
        }

        // console.log(columns)
        return columns
    }

    // console.log(getFromColumn(1,2))
    // console.log(showAllFromColumn(1))

    function insertToColumn(column, crates) {
        let indexNotFilled = cratesGrid.length;

        for (let i = 0; i < cratesGrid.length; i++) {
            if (cratesGrid[i][column] != 0) {
                indexNotFilled = i
                break;
            }
        }

        // PART 1 - inverted
        // for (let i = 0; i < crates.length; i++) {
        //     cratesGrid[indexNotFilled + i - crates.length][column] = crates[crates.length - i - 1]
        // }

        // PART 2 - correct form
        for (let i = 0; i < crates.length; i++) {
            cratesGrid[indexNotFilled + i - crates.length][column] = crates[i]
        }
    }

    // console.log(getFromColumn(8))
    // console.log(showAllFromColumn(8))

    // const dataToInsert = getFromColumn(from-1, move)
    // insertToColumn(to-1, dataToInsert)
    // console.table(cratesGrid)

 
    rules.forEach(rule => {
        const [move, from, to] = rule;
        const dataToInsert = getFromColumn(from - 1, move)
        insertToColumn(to - 1, dataToInsert)
    })

    // let ri = 0
    // setInterval(()=>{
    //     const [move, from, to] = rules[ri];
    //     console.log(`move ${move} from ${from} to ${to}`)
    //     const dataToInsert = getFromColumn(from-1, move)
    //     insertToColumn(to-1, dataToInsert)
    //     console.table(cratesGrid)
    //     ri++
    // },100)

    console.log("END")
    console.table(cratesGrid)
});
