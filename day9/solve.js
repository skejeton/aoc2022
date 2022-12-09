let input = document.body.innerText.trim()

let commands = input.split("\n").map(e => [e.split(" ")[0], parseInt(e.split(" ")[1])])

function dotheytouch(t, h) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if ((t[0]+i) == h[0] && (t[1]+j) == h[1]) return true;
    }
  }

  return false;
}

function closestintersection(t, h) {
  let intersections = []

  for (let j = -1; j < 2; j++) {
    for (let i = -1; i < 2; i++) {
      if (dotheytouch([t[0]+i, t[1]+j], h)) {
        intersections.push([t[0]+i, t[1]+j]);
      }
    }
  }
  
  let mind = 10000000;
  let minint;
  intersections.forEach(e => {
    let d = ((e[0]-h[0])*(e[0]-h[0])+(e[1]-h[1])*(e[1]-h[1]));
    if (d < mind) {
      mind = d;
      minint = e;
    }
  }) 
  
  return minint;
}


function domove(state, command) {
  state.placeSet.add(JSON.stringify(state.rope[state.rope.length-1]))

  let prevp = null;

  for (let i = 0; i < state.rope.length; i++) {
    let pos = state.rope[i]

    if (prevp) {
      if (!dotheytouch(pos, prevp)) {
        let ci = closestintersection(pos, prevp)
        pos[0] = ci[0]; pos[1] = ci[1];
      }
    } else {
      switch (command) {
        case 'R': pos[0] += 1; break;
        case 'L': pos[0] -= 1; break;
        case 'D': pos[1] += 1; break;
        case 'U': pos[1] -= 1; break;
      }
    }
    prevp = [pos[0], pos[1]];
  }

  state.placeSet.add(JSON.stringify(state.rope[state.rope.length-1]))
}

function domoven(state, command) {
  for (let i = 0; i < command[1]; i++) {
    domove(state, command[0])
  }
}

function domoves(state, commands) {
  commands.forEach(cmd => {
    domoven(state, cmd)
  })
}

let p1, p2;
let state = {
  placeSet: new Set(),
  rope: [[0, 0], [0, 0]],
}
domoves(state, commands)
p1 = [...state.placeSet].length

state = {
  placeSet: new Set(),
  rope: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
}
domoves(state, commands)
p2 = [...state.placeSet].length

console.log([p1, p2])
