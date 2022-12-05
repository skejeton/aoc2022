let input = document.body.innerText.trim()

function parseDat(dat) {
  let lines = dat.split('\n')
  let stacksLen = ~~(lines[lines.length-1].length/4+1)
  console.log(stacksLen)
  let stacks = new Array(stacksLen)

  for (let i = 0; i < stacksLen; i++) {
    stacks[i] = new Array()
  }

  let i = 0;
  for (let line of lines) {
    if (i == lines.length-1) {
      continue
    }
    i++;
    
    line.split('').forEach((e, i) => {
      if (e != '[' && e != ']' && e != ' ') {
        stacks[~~(i/4)].push(e)
      }
    })
  }
  for (let i = 0; i < stacksLen; i++) {
    stacks[i].reverse()
  }
  return stacks
}
function parseInstrs(instrs) {
  return instrs.split("\n").map(e => {
    let x = e.replace(/(move|from|to)/g, "").replace(/\s+/g, " ").split(" ").filter( e=> e != "")
    return [parseInt(x[0]), parseInt(x[1]), parseInt(x[2])]
  })
}

function move(from, to, stack) {
  from -= 1
  to -= 1
  if (stack[from].length == 0) return;
  let i = stack[from][stack[from].length-1]
  stack[from].pop()
  stack[to].push(i)
}

function moven(n, from, to, stack) {
  for (let i = 0; i < n; i++) {
    move(from, to, stack)
  }
}
 
function moven2(n, from, to, stack) {
  from -= 1;
  to -= 1;
  lo = stack[from].length-n;
  if (lo < 0) lo = 0;
  let d = stack[from].slice(lo)
  stack[from] = stack[from].slice(0, lo)
  stack[to] = [...stack[to], ...d]
}

function doInstr(movef, instr, dat) {
  for (let i of instr) {
    movef(i[0], i[1], i[2], dat)
  }
}

function accumulateTop(dat) {
  let s = ""
  for (let i of dat) {
    s += i[i.length-1]
  }
  return s
}

let [datr, instrr] = input.split("\n\n")
let [dat, instr] = [parseDat(datr), parseInstrs(instrr)]
let dat2 = JSON.parse(JSON.stringify(dat))
doInstr(moven, instr, dat)
doInstr(moven2, instr, dat2)
console.log([accumulateTop(dat), accumulateTop(dat2)])
