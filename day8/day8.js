// TASK: https://adventofcode.com/2022/day/5

const fs = require('fs');


function getFromColumn(arr, column, currentIndex) {
    const columnsTop = []
    const columnsBottom = []
    for (let i = 0; i < currentIndex; i++) {
        columnsTop.push(arr[i][column])
    }
    for (let i = currentIndex + 1; i < arr.length; i++) {
        columnsBottom.push(arr[i][column])
    }
    return {
        columnsBottom,
        columnsTop
    }
}

function getFromRow(arr, row, currentIndex) {
    const rowsLeft = []
    const rowsRight = []
    for (let i = 0; i < currentIndex; i++) {
        rowsLeft.push(arr[row][i])
    }
    for (let i = currentIndex + 1; i < arr[row].length; i++) {
        rowsRight.push(arr[row][i])
    }
    return {
        rowsLeft,
        rowsRight
    }
}


fs.readFile('input-8.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const xx = data.split("\n").map(x => x.split(""))
    const map = xx.map(x => {
        return x.map(z => {
            return parseInt(z)
        })
    })

    const rows = map.length
    const col = map[0].length
    console.log(rows, col)


    //PART 1
    let howManyVisible = 0;

    for (let i = 1; i < map.length - 1; i++) {
        for (let z = 1; z < map[i].length - 1; z++) {
            const checkedValue = map[i][z];
            const valuesInColumns = getFromColumn(map, z, i)
            const valuesInRows = getFromRow(map, i, z)

            const isVisibleLeft = valuesInRows.rowsLeft.every(x => x < checkedValue)
            const isVisibleRight = valuesInRows.rowsRight.every(x => x < checkedValue)
            const isVisibleTop = valuesInColumns.columnsTop.every(x => x < checkedValue)
            const isVisibleBottom = valuesInColumns.columnsBottom.every(x => x < checkedValue)

            if (isVisibleLeft || isVisibleRight || isVisibleTop || isVisibleBottom) {
                howManyVisible++
            }

        }
    }

    console.log("How many visible", howManyVisible)
    console.log("visible with out borders", howManyVisible + (rows * 2 + col * 2 - 4))


    const scenicScores = []
    //PART 2
    for (let i = 1; i < map.length - 1; i++) {
        for (let z = 1; z < map[i].length - 1; z++) {
            const checkedValue = map[i][z];
            const valuesInColumns = getFromColumn(map, z, i)
            const valuesInRows = getFromRow(map, i, z)

            let treesLeft = 0;
            let treesRight = 0;
            let treesTop = 0;
            let treesBottom = 0;

            for(let j = valuesInRows.rowsLeft.length-1; j >= 0; j--){
                if(valuesInRows.rowsLeft[j] < checkedValue){
                    treesLeft++
                }
                if(valuesInRows.rowsLeft[j] == checkedValue){
                    treesLeft++
                    break
                }
                if(valuesInRows.rowsLeft[j] > checkedValue){
                    break
                }
            }

            for(let j = 0; j < valuesInRows.rowsRight.length; j++){
                if(valuesInRows.rowsRight[j] < checkedValue){
                    treesRight++
                }
                if(valuesInRows.rowsRight[j] == checkedValue){
                    treesRight++
                    break
                }
                if(valuesInRows.rowsRight[j] > checkedValue){
                    break
                }
            }

            for(let j = valuesInColumns.columnsTop.length-1; j >= 0; j--){
                if(valuesInColumns.columnsTop[j] < checkedValue){
                    treesTop++
                }
                if(valuesInColumns.columnsTop[j] == checkedValue){
                    treesTop++
                    break
                }
                if(valuesInColumns.columnsTop[j] > checkedValue){
                    break
                }
            }

            for(let j = 0; j < valuesInColumns.columnsBottom.length; j++){
                if(valuesInColumns.columnsBottom[j] < checkedValue){
                    treesBottom++
                }
                if(valuesInColumns.columnsBottom[j] == checkedValue){
                    treesBottom++
                    break
                }
                if(valuesInColumns.columnsBottom[j] > checkedValue){
                    break
                }
            }

            const trees = treesLeft * treesRight * treesTop * treesBottom
            scenicScores.push(trees)

        }
    }

    console.log("scenicScores", scenicScores)
    console.log("max scenicScores", Math.max(...scenicScores))
});
