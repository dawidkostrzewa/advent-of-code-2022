// TASK: https://adventofcode.com/2022/day/1

const fs = require('fs');

fs.readFile('input-1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const allCalories = data.split("\n")
  .join("+")
  .split("++")
  .map(row => row.split("+"))
  .map(row => row.map(c => parseInt(c)));

const summed = allCalories.map(row => row.reduce((a, b) => a + b, 0));

summed.sort((a, b) => b - a);
console.log(summed[0] + summed[1] + summed[2]);
});