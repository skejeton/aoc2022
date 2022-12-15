let input = document.body.innerText.trim()
let p1, p2

let positions = input.split("\n").map(e => {
  let tuple = e.slice(10).split("\:")
  tuple[0] = tuple[0].replace(/(.\=|\,)/g, "")
  tuple[1] = tuple[1].slice(22).replace(/(.\=|\,)/g, "")
  return [tuple[0].split(" ").map(e => parseInt(e)),
          tuple[1].split(" ").map(e => parseInt(e))]
})

function hasy(p1, p2, y) {
  let dist = Math.abs(p2[0]-p1[0])+Math.abs(p2[1]-p1[1])
  let distY = Math.abs(y-p1[1])
  return distY <= dist;
}

function mh_row(p1, p2, y) {
  let dist = Math.abs(p2[0]-p1[0])+Math.abs(p2[1]-p1[1])
  let distY = Math.abs(y-p1[1])
  
  let start = p1[0]-dist+distY
  let d = Math.max((dist*2+1)-(2*distY), 0);
  return [start, d+start]
}

function rangecoll(r1, r2) {
  return r2[1] >= r1[0] && r2[0] < r1[1]
}

function mergeranges(rs) {
  rs = rs.sort((a, b) => a[0] - b[0])
  let ranges = [rs[0]]

  for (let i = 1; i < rs.length; i++) {
    let merged = ranges[ranges.length-1]
    let range = rs[i]
    if (rangecoll(merged, range)) {
      merged[1] = Math.max(range[1], merged[1])
    } else {
      ranges.push(range)
    }
  }

  return ranges
}

let p1r = mergeranges(positions.map(e => mh_row(e[0], e[1], 2000000)))
p1 = p1r[0][1]-p1r[0][0]-1;

for (let i = 4000000; i >= 0; i--) {
  let ranges = positions.filter(e => hasy(e[0], e[1], i)).map(e => mh_row(e[0], e[1], i))
  if (ranges.length < 2) continue;
  let m = mergeranges(ranges);
  if (m.length > 1) {
    p2 = m[0][1]*4000000+i;
    break;
  }
}

console.log([p1, p2])