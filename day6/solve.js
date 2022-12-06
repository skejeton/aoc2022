let input = document.body.innerText.trim()

function checkdiff(chars) {
  return [...new Set(chars.split(""))].length == chars.length
}

let a, b;
for (let i = 0; i < input.length-3; i++) {
  let chunk = input.slice(i, i+4)
  if (checkdiff(chunk)) {
    a = i+chunk.length;
    break;
  }
}
for (let i = 0; i < input.length-13; i++) {
  let chunk = input.slice(i, i+14)
  if (checkdiff(chunk)) {
    b = i+chunk.length;
    break;
  }
}
console.log([a, b])
