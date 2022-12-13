let input = document.body.innerText.trim()
let inputs = input.split('\n\n').map(e => e.split('\n').map(e => JSON.parse(e)))

function compare(l, r) {
  if (l == undefined) return 1;
  if (r == undefined) return -1;
  if (typeof(l) == "number" && typeof(r) == "number") {
    if (l < r) return 1;
    if (l > r) return -1;
    return 0;
  }
  if (typeof(l) == "number") {
    l = [l]
  }
  if (typeof(r) == "number") {
    r = [r]
  }

  let maxlen = l.length > r.length ? l.length : r.length;
  for (let i = 0; i < maxlen; i++) {
    let status = compare(l[i], r[i])
    if (status != 0) {
      return status;
    }
  }
  
  return 0;
}

let sum = 0;
inputs.forEach((e, i) => {
  if (compare(e[0], e[1]) == 1) {
    sum += i+1;
  }
})

let allinputs = inputs.flat()
let d1 = [[2]], d2 = [[6]];
allinputs.push(d1)
allinputs.push(d2)
let sorted = allinputs.sort((a, b) => compare(b, a))
console.log([sum, (sorted.indexOf(d1)+1)*(sorted.indexOf(d2)+1)])



