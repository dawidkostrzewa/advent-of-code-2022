// TASK: https://adventofcode.com/2022/day/2

const fs = require('fs');

const getInput = (tool) => {
    switch (tool) {
        case "A":
        case "X":
            return "Rock";
            break;
            case "B": case "Y":
                return "Paper";
                break;
                case "C": case "Z":
                    return "Scissors";
    }
}


//A X - rock 1 B Y - paper 2 C Z - scissors 3
//X - need lose Y - need drawn Z - need win
const getPoints = (comp, me) => { 
    if(comp === "A" ) {
       if(me === "Y") {
           return 3+1;
       }
       if(me === "X") {
           return 0+3;
       }
       if(me === "Z") {
           return 6+2;
       }
    }
    if(comp === "B" ) {
        if(me === "Y") {
            return 3+2;
        }
        if(me === "X") {
            return 0+1;
        }
        if(me === "Z") {
            return 6+3;
        }
    }
    if(comp === "C" ) {
        if(me === "Y") {
            return 3+3;
        }
        if(me === "X") {
            return 0+2;
        }
        if(me === "Z") {
            return 6+1;
        }
    }
}


fs.readFile('input-2.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const splitted = data.split("\n")
  console.log(splitted);

  let sum = 0;

  splitted.forEach(game => {
    const gameArr = game.split(" ")
    const player1 = gameArr[0]
    const player2 = gameArr[1]
    // console.log(getInput(player1), getInput(player2))
    const points = getPoints(player1, player2);
    console.log(points)
    sum+=points;
  })
  console.log(sum)
})