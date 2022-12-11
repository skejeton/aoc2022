let input = document.body.innerText.trim()


let lines = input.split("\n")
let i = 0; 
let monkeys = []


let multiple = 1, divisor;

while (i < lines.length) {
  i++;
  let startingItems = lines[i].split(":")[1].split(",").map(e => BigInt(parseInt(e.trim())));
  i++;
  let operation = lines[i].split("=")[1].trim().split(" ");
  if (operation[0] != "old") operation[0] = BigInt(parseInt(operation[0]));
  if (operation[2] != "old") operation[2] = BigInt(parseInt(operation[2]));
  i++;
  let testv = parseInt(lines[i].trim().split(" ")[3])
  i++;
  let ifyes = parseInt(lines[i].trim().split(" ")[5])
  i++;
  let ifno = parseInt(lines[i].trim().split(" ")[5])
  i++;
  i++;

  multiple *= testv;

  monkeys.push({items: startingItems, operation: operation,
                testv: testv, ifyes: ifyes, ifno: ifno, inspected: 0})
}


function getrvl(init, operand) {
  if (operand == 'old') {
    return init;
  } else {
    return operand;
  }
}

function simOperation(value, operation) {
  let v1 = getrvl(value, operation[0])
  let v2 = getrvl(value, operation[2])
  if (operation[1] == '*') return v1 * v2;
  if (operation[1] == '+') return v1 + v2;
  throw "err"
}

function findMonkeyDest(monkey, value, index) {
  let v = simOperation(value, monkey.operation)
  v = v / BigInt(divisor)
  v = v % BigInt(multiple)
  if (v % BigInt(monkey.testv) == BigInt(0)) {
    return [v, index, monkey.ifyes];
  } else {
    return [v, index, monkey.ifno];
  }
}

function simMonkey(monkey, index) {
  return monkey.items.map(e => findMonkeyDest(monkey, e, index))
}

function syncMonkeys(monkeys, res) {
  for (let i = 0; i < res.length; i++) {
    let e = res[i]
    monkeys[e[1]].inspected += 1
    monkeys[e[1]].items.shift()
    monkeys[e[2]].items.push(e[0])
  }
}

function runPass(monkeys) {
  for (let i = 0; i < monkeys.length; i++) {
    syncMonkeys(monkeys, simMonkey(monkeys[i], i))
  }
}

function monkeysCopy(monkeys) {
  return monkeys.map(monkey => {
    let items = monkey.items.map(e => e)
    let operation = monkey.operation
    let testv = monkey.testv
    let ifyes = monkey.ifyes
    let ifno = monkey.ifno
    let inspected = monkey.inspected

    let newmonkey = {items: items, operation: operation,
                testv: testv, ifyes: ifyes, ifno: ifno, inspected: inspected}
    return newmonkey;
  })
}

let monkeys1 = monkeysCopy(monkeys)
divisor = 3;
for (let i = 0; i < 20; i++)
  runPass(monkeys1)
let p1 = monkeys1.map(e => e.inspected).sort((a, b) => b - a);


let monkeys2 = monkeysCopy(monkeys)
divisor = 1;
for (let i = 0; i < 10000; i++)
  runPass(monkeys2)
let p2 = monkeys2.map(e => e.inspected).sort((a, b) => b - a);
console.log([p1[0]*p1[1], p2[0]*p2[1]])

