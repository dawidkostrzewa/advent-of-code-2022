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

const getPoints = (comp, me) => {
    if(comp === "Rock" ) {
       if(me === "Rock") {
           return 1+3;
       }
       if(me === "Paper") {
           return 2+6;
       }
       if(me === "Scissors") {
           return 3+0;
       }
    }
    if(comp === "Paper" ) {
        if(me === "Rock") {
            return 1+0;
        }
        if(me === "Paper") {
            return 2+3;
        }
        if(me === "Scissors") {
            return 3+6;
        }
    }
    if(comp === "Scissors" ) {
        if(me === "Rock") {
            return 1+6;
        }
        if(me === "Paper") {
            return 2+0;
        }
        if(me === "Scissors") {
            return 3+3;
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
    const player1 = getInput(gameArr[0]);
    const player2 = getInput(gameArr[1]);
    const points = getPoints(player1, player2);
    console.log(points)
    sum+=points;
  })
  console.log(sum)
})