// TASK: https://adventofcode.com/2022/day/1

const fs = require('fs');

fs.readFile('input-1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitted = data.split("\n")
  const x = splitted.join("+").split("++");
  const allCalories = x.map(row => {
    return row.split("+");
  })

  console.log(allCalories)

  let max = 0;

  const summed = []

  allCalories.forEach(calories => {
    let sum = 0;
    calories.forEach(calorie => {
      sum += parseInt(calorie);
    })
    if (sum > max) {
      max = sum;
    }

    summed.push(sum)
  })

  summed.sort((a, b) => b - a);
  console.log(summed)
  console.log(summed[0] + summed[1] + summed[2])
});