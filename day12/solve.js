let input = document.body.innerText.trim()

let lines = input.split("\n")

function strrep(str, i, c) {
  return str.split('').map((e, index) => index == i ? c : e).join('')
}

function fieldSet(field, p, c) {
  let x = p[0]
  let y = p[1]
  field[y] = strrep(field[y], x, c)
}

function getPoint(field, point) {
  return field[point[1]][point[0]]
}

function printField(field, map) {
  field.forEach((e, y) => {
    let s = ""
    e.split('').forEach((c, x) => {
      if (getPoint(field, [x, y]) == ' ') {
        s += getPoint(map, [x, y])
      } else {
        s += "\x1b[32m"+getPoint(field, [x, y])+"\x1b[0m"
      }
    })
    console.log(s)
  })
}

function getTile(map, point) {
  let tile = map[point[1]][point[0]].charCodeAt(0)
  if (tile == 'E'.charCodeAt(0))  {
    tile = 'z'.charCodeAt(0);
  }
  if (tile == 'S'.charCodeAt(0))  {
    tile = 'a'.charCodeAt(0);
  }
  return tile;
}

function neighbors(map, point, cache) {
  let neighbours = [[point[0], point[1]+1],
                    [point[0]+1, point[1]],
                    [point[0], point[1]-1],
                    [point[0]-1, point[1]]];
  let parenting = ['^', '<', 'v', '>']
  let result = []
  let parentPoint = point;
  for (let i = 0; i < 4; i++) {
    let point = neighbours[i]
    if (point[0] < 0 || point[1] < 0 ||
        point[1] >= map.length || point[0] >= map[0].length) {
      continue;
    }

    let p = getTile(map, point),
        pp = getTile(map, parentPoint);
    if ((pp-p) > 1) {
      continue;
    }

    result.push([point, parenting[i]])
  }

  return result;
}

function populateFieldPoint(map, field, point, rt) {
  let queue = []
  queue.push(point);
  fieldSet(field, point, '.')

  while (queue.length != 0) {
    let pos = queue.shift();
    let neighbours = neighbors(map, pos)
    neighbours.forEach(n => {
      if (getPoint(field, n[0]) == ' ') {
        fieldSet(field, n[0], n[1]) 
        queue.push(n[0])
      }
    })
  }
}

function findEnd(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] == 'E') {
        return [x, y]
      }
    }
  }
  throw "Err0"
}

function findStart(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] == 'S') {
        return [x, y]
      }
    }
  }
  throw "Err1"
}

function createField(map, at) {
  let field = lines.map(e => e.replace(/./g, ' '))
  populateFieldPoint(map, field, findEnd(map), 'z'.charCodeAt(0), '.')
  return field
}

function backtrack(field, point) {
  let steps = 0;
  if (getPoint(field, point) == ' ') {
    return
  }
  while (getPoint(field, point) != '.') {
    steps++;
    switch (getPoint(field, point)) {
      case '<': point[0] -= 1; break;
      case '>': point[0] += 1; break;
      case '^': point[1] -= 1; break;
      case 'v': point[1] += 1; break;
    }
  }
  return steps;
}

function allDist(map, field) {
  let dists = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] == 'a') {
        dists.push(backtrack(field, [x, y]))
      }
    }
  } 
  return dists
}

let field = createField(lines);
console.log([backtrack(field, findStart(lines)), allDist(lines, field).sort((a, b) => a-b)[0]])
