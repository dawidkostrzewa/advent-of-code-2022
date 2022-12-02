const fs = require('fs');

fs.readFile('input-1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitted = data.split("\n")
  console.log(splitted);

  const arr = [];
  splitted.map(i => {

  })

  console.log(splitted.join("+").split("++"))

  const x = splitted.join("+").split("++");
  const abc = x.map(row => {
    return row.split("+");
  })

  console.log(abc)

  let max = 0;

  const summed = []

  abc.forEach(calories => {
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