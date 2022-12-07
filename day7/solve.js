let input = document.body.innerText.trim()



let lines = input.split('\n')
let commands = []

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith("$ ")) {
    let cmd = lines[i].slice(2).split(" ")
    let out = []
    while (lines[i+1] && !lines[i+1].startsWith("$ ")) {
      out.push(lines[i+1].split(" "))
      i++;
    }
    cmd.push(out)
    commands.push(cmd)
  }
}

function treeAdd(tree, ks, v) {
  ks.forEach((e, i) => {
    if (i == ks.length-1) {
      tree[e] = v
    } else if (!tree[e]) {
      tree[e] = {}
    }
    tree = tree[e]
  })
}

function interpret(state, command) {
  
  switch (command[0]) {
    case "cd":
      if (command[1] == "/") {
        state.cd = ""
      } else if (command[1] == "..") {
        let dirs = state.cd.split("/")
        state.cd = dirs.slice(0, dirs.length-1).join("/")
      } else {
        state.cd += "/"+command[1]
      }
      break;
    case "ls":
      command[1].forEach(e => {
        if (e[0] != "dir") {
          treeAdd(state.tree, [...state.cd.split("/").filter(e => e != ""), e[1]], parseInt(e[0]))
        }
      })
      break;
  }
}
let state = {cd: "", tree: {}};

commands.forEach(cmd => interpret(state, cmd))

function dirsize(dirs, dir, path) {
  dirs[path] = 0;
  for (let i in dir) {
    let v = dir[i]
    if (typeof v == "number") {
      dirs[path] += v;
    } else {
      dirs[path] += dirsize(dirs, v, path+"/"+i)
    }
  }

  return dirs[path]
}

let dirsizes = {}
dirsize(dirsizes, state.tree, "")

let sum = 0;
let used = 0;
let values = []
for (let i in dirsizes) {
  values.push(dirsizes[i])
  if (dirsizes[i] <= 100000) {
    sum += dirsizes[i];
  }
}

used = dirsizes[""];
let unused = 70000000-used


values.sort((a, b) => a - b)

let v = 0;
for (let e of values) {
  if (e+unused > 30000000) {
    v = e;
    break;
  }
} 

console.log([sum, v])
