let input = document.body.innerText.trim()

let instrs = input.split("\n").map(e => e.split(" ")).map(e => e[0] == "addx" ? [e[0], parseInt(e[1])] : e)


function execute(state, instrs, oncycle) {
  
  let cycles = 0;
  for (let i = 0; i < instrs.length; i++) {
    let instr = instrs[i]
    if (instr[0] == "noop") {
      cycles += 1;     
      oncycle(cycles)
    }
    else if (instr[0] == "addx") {
      cycles += 1;
      oncycle(cycles)
      cycles += 1;
      oncycle(cycles)
      state.x += instr[1]
    } else {
      throw "err1 "+instr[0]
    }
  }
}


let state = {x: 1}
let part1 = 0;

function spriteatpixel(sp, px) {
  return px == (sp-1) || px == sp || px == (sp+1)
}

let screen = ``

execute(state, instrs, (cycleno) => {
  if (spriteatpixel(state.x%40, (cycleno-1)%40)) {
    screen += '#'
  } else {
    screen += '.'
  }
  if ((cycleno-20)%40==0) {
    part1 += state.x*cycleno;
  }
  if ((cycleno)%40==0) {
    screen += '\n'
  }
})

console.log(part1) 
console.log("\n"+screen)

