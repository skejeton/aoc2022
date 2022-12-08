let input = document.body.innerText.trim()

function sweepone(fs) {
  let vstate = new Array(fs.length);
  for (let target = 0; target <= 9; target++) {
    let pastIndex = -1;
    fs.forEach((e, i) => {
      if (e == target) {
        vstate[i] = pastIndex;
      }
      if (e >= target) {
        pastIndex = i;
      }
    })
  }
  return vstate
}

function sweep(f) {
  let fs = f.split('').map(e => parseInt(e))

  let vstate = sweepone(fs);
  fs.reverse()
  let rsweep = sweepone(fs);
  rsweep.reverse()
  vstate = rsweep.map((e, i) => [vstate[i], e == -1 ? -1 : fs.length-e-1])
  
  return vstate
}

let sweepArr = []
let sweepArrCols = []
let inputSplit = input.split("\n")

inputSplit.forEach(e => {
  sweepArr.push(sweep(e))
})


for (let x = 0; x < inputSplit[0].length; x++) {
  let acc = ""
  for (let y = 0; y < inputSplit.length; y++) {
    acc += inputSplit[y][x]
  }
  sweepArrCols.push(sweep(acc))
}

for (let x = 0; x < inputSplit[0].length; x++) {
  for (let y = 0; y < inputSplit.length; y++) {
    sweepArr[y][x].push(sweepArrCols[x][y][0])
    sweepArr[y][x].push(sweepArrCols[x][y][1])
  }
}

function vrangescore(l, r, m, c) {
  let range = 1;
  if (l < 0) range *= c;
  else range *= c-l;
  if (r < 0) range *= m-c-1;
  else range *= r-c;
  return range;
}

let part1 = 0;
let part2 = 0;
for (let x = 0; x < inputSplit[0].length; x++) {
  for (let y = 0; y < inputSplit.length; y++) {
    part1 += sweepArr[y][x].indexOf(-1) >= 0;
    let max = vrangescore(sweepArr[y][x][0], sweepArr[y][x][1], inputSplit[0].length, x)*
              vrangescore(sweepArr[y][x][2], sweepArr[y][x][3], inputSplit.length, y);
    if (max > part2) {
      part2 = max;
    }
    sweepArr[y][x] = max;
  }
}

console.log([part1, part2])
