// TASK: https://adventofcode.com/2022/day/11

const fs = require('fs');

function getResultOfOperation(op, input) {
    const [operator, value] = op;
    let intValue = +value;
    if (value == 'old') {
        intValue = input;
    }
    switch (operator) {
        case "+":
            return input + intValue;
        case "-":
            return input - intValue;
        case "*":
            return input * intValue;
        case "/":
            return input / intValue;
    }
}

fs.readFile('input-11.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }


    const monkeys = data.split("Monkey ").map(m => m.split("\n"))
        .map(x => {
            const [idx, items, operation, test, conTrue, conFalse] = x;
            return {
                idx: +idx.split(":")[0],
                items: items?.split(":")[1].split(" ").map(x => x.split(",")).flat().filter(x => x !== "").map(x => +x),
                operation: operation?.split(":")[1].split(" = old")[1].trim().split(" "),
                test: +test?.split(":")[1].split(" divisible by ")[1],
                conTrue: +conTrue?.split(":")[1].split("throw to monkey ")[1],
                conFalse: +conFalse?.split(":")[1].split("throw to monkey ")[1],
                inspectedTimes: 0
            }
        });
    monkeys.shift();

    const ROUNDS = 20;

    for (let r = 0; r < ROUNDS; r++) {
        for (let i = 0; i < monkeys.length; i++) {
            const monkey = monkeys[i];
            const { idx, items, operation, test, conTrue, conFalse } = monkey;
            items.forEach(it => {
                const afterOperation = getResultOfOperation(operation, it);
                const afterBored = parseInt(afterOperation / 3)
                if (afterBored % test === 0) {
                    monkeys[conTrue].items.push(afterBored)
                }
                else {
                    monkeys[conFalse].items.push(afterBored)
                }
                monkey.inspectedTimes = monkey.inspectedTimes + 1;
                return []
            })

            monkey.items = [];
        }
    }


    const mostInspectedMonkeysSorted = monkeys.sort((a, b) => b.inspectedTimes - a.inspectedTimes);
    const twoMostInspected = mostInspectedMonkeysSorted.slice(0, 2);
    console.log("PART 1 ANSWER", twoMostInspected[0].inspectedTimes * twoMostInspected[1].inspectedTimes)
});
