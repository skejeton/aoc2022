let input = document.body.innerText.trim();
let p1, p2

let segments = input.split("\n").map(e => e.split(" -> ").map(p => p.split(",").map(c => parseInt(c))))

function mapset(map, point, v) {
  if (v == '#') {
    if (point[0] < map.lt[0]) map.lt[0] = point[0];
    if (point[1] < map.lt[1]) map.lt[1] = point[1];
    if (point[0] > map.rb[0]) map.rb[0] = point[0];
    if (point[1] > map.rb[1]) map.rb[1] = point[1];
  }

  map.pts.set(`${point[0]},${point[1]}`, v);
}


function mapget(map, point) {
  let v = map.pts.get(`${point[0]},${point[1]}`)
  if (v == undefined) return '.';
  return v;
}

function mapmk() {
  return {lt: [10000000000, 0], rb: [-10000000000, -100000000000], pts: new Map()}
}

function maplineseg(map, a, b) {
  if (a[0] != b[0] && a[1] != b[1]) {
    throw "err: diagonal line seg"
  }
  
  if (a[0] != b[0]) {
    let min = Math.min(a[0], b[0])
    let max = Math.max(a[0], b[0])
    for (let x = min; x <= max; x++) {
      mapset(map, [x, a[1]], '#')
    }
  } else {
    let min = Math.min(a[1], b[1])
    let max = Math.max(a[1], b[1])
    for (let y = min; y <= max; y++) {
      mapset(map, [a[0], y], '#')
    }
  }
}

function mapsetseg(map, segment) {
  let prev = null;
  segment.forEach(e => {
    if (prev != null) {
      maplineseg(map, prev, e)
    }
    prev = e;
  })
}

function mapsetsegs(map, segments) {
  segments.forEach(e => mapsetseg(map, e))
}

function mapprint(map) {
  let grid = ``
  for (let y = map.lt[1]; y <= map.rb[1]; y++) {
    for (let x = map.lt[0]; x <= map.rb[0]; x++) {
      grid += mapget(map, [x, y])
    }
    grid += '\n';
  }
  console.log(grid)
}

function parsepoint(pt) {
  return pt.split(",").map(e => parseInt(e))
}

function pointadd(a, b) {
  return [a[0]+b[0], a[1]+b[1]]
}

function mapsim(map, p1) {
  let sand = [500, 0]
  if (mapget(map, sand) == 'o') {
    return false;
  }
  do {
    if (sand[1] > map.rb[1]) {
      if (p1) {
        return false;
      }
      break;
    }
    if (mapget(map, pointadd(sand, [0, 1])) == '.') {
      sand[1] += 1;
    } else if (mapget(map, pointadd(sand, [-1, 1])) == '.') {
      sand[0] -= 1;
      sand[1] += 1;
    } else if (mapget(map, pointadd(sand, [1, 1])) == '.') {
      sand[0] += 1;
      sand[1] += 1;
    } else {
      break;
    }
  } while(true)

  mapset(map, sand, 'o')
  return true;
}

let map = mapmk()
mapsetsegs(map, segments)

p1 = 0;
while (mapsim(map, true)) {p1++;}
p2 = p1;
while (mapsim(map, false)) {p2++;}
console.log([p1, p2])
