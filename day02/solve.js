const tran = {'X': 'A', 'Y': 'B', 'Z': 'C'}
const winner = {'A': 'B', 'B': 'C', 'C': 'A'}
const loser = {'B': 'A', 'C': 'B', 'A': 'C'}
const draw = {'B': 'B', 'C': 'C', 'A': 'A'}
const addt = {'A': 1, 'B': 2, 'C': 3}

function scoref(a, b) {
 if (a == b) return 3;
 if (a == 'A' && b == 'B') return 0;
 if (a == 'B' && b == 'C') return 0;
 if (a == 'C' && b == 'A') return 0;
 if (a == 'B' && b == 'A') return 6;
 if (a == 'C' && b == 'B') return 6;
 if (a == 'A' && b == 'C') return 6;
 console.error("sdfsdf")
}

var score1 = 0;
var score2 = 0;
function interp(x) {
 score1 += scoref(tran[x[1]], x[0]) + addt[tran[x[1]]] 
 let fig = null;
 if (x[1] == "X") fig = loser[x[0]];
 if (x[1] == "Y") fig = draw[x[0]];
 if (x[1] == "Z") fig = winner[x[0]];
 if (fig == null) console.error("sdfsdf")
 score2 += scoref(fig, x[0]) + addt[fig] 
}


document.body.innerText.split("\n").filter(e => e != "").map(e => e.split(" ")).forEach(interp)
console.log([score1, score2])
