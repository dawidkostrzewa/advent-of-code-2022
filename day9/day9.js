// TASK: https://adventofcode.com/2022/day/9

const fs = require('fs');

function isHTouchingT(h, t) {
    if (h.x == t.x && (h.y - 1 == t.y || h.y + 1 == t.y)) return true
    if (h.y == t.y && (h.x - 1 == t.x || h.x + 1 == t.x)) return true
    if (h.x == t.x && h.y == t.y) return true
    if (h.x - 1 == t.x && h.y - 1 == t.y || h.x + 1 == t.x && h.y - 1 == t.y || h.x - 1 == t.x && h.y + 1 == t.y || h.x + 1 == t.x && h.y + 1 == t.y) return true
}


fs.readFile('input-9.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const moves = data.split("\n").map(x => {
        return {
            direction: x.split("")[0],
            value: parseInt(x.split("").slice(1).join(""))
        }
    })
    // console.log(moves)

    const positionsVisitedByTail = [{ x: 0, y: 0 }]
    let HX = 0;
    let HY = 0;

    let TX = 0;
    let TY = 0;

    moves.forEach(move => {
        const { direction, value } = move;

        switch (direction) {
            case "U":
                for (let i = 0; i < value; i++) {
                    HY++;
                    const isTouching = isHTouchingT({ x: HX, y: HY }, { x: TX, y: TY })
                    if (isTouching) {

                    } else {
                        TY = HY - 1;
                        TX = HX;
                        positionsVisitedByTail.push({ x: TX, y: TY })
                    }
                }
                break;
            case "D":
                for (let i = 0; i < value; i++) {
                    HY--;
                    const isTouching = isHTouchingT({ x: HX, y: HY }, { x: TX, y: TY })
                    if (isTouching) {

                    } else {
                        TY = HY + 1;
                        TX = HX;
                        positionsVisitedByTail.push({ x: TX, y: TY })
                    }
                }
                break;
            case "L":
                for (let i = 0; i < value; i++) {
                    HX--;
                    const isTouching = isHTouchingT({ x: HX, y: HY }, { x: TX, y: TY })
                    if (isTouching) {

                    } else {
                        TY = HY
                        TX = HX + 1;
                        positionsVisitedByTail.push({ x: TX, y: TY })
                    }
                }
                break;
            case "R":
                for (let i = 0; i < value; i++) {
                    HX++;
                    const isTouching = isHTouchingT({ x: HX, y: HY }, { x: TX, y: TY })
                    if (isTouching) {

                    } else {
                        TY = HY
                        TX = HX - 1;
                        positionsVisitedByTail.push({ x: TX, y: TY })
                    }
                }
                break;
            default:
                break;
        }
    })

    const convertToStrings = positionsVisitedByTail.map(x => `${x.x},${x.y}`)
    console.log("ANSWER PART1",[...new Set(convertToStrings)].length)

});
