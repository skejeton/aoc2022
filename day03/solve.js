let input = document.body.innerText.trim()

function splitInHalf(s) {
  return [s.slice(0, s.length/2), s.slice(s.length/2)]
}

function getIntersection(setA, setB) {
  const intersection = new Set(
    [...setA].filter(element => setB.has(element))
  );

  return intersection;
}

function findSame(a, b) {
  let same = [...new Set(a.split("").filter(e => b.indexOf(e) >= 0))]
  if (same.length == 0) throw "err0"
  if (same.length > 1) throw "err1"
  return same[0]
}

function chunk (arr, len) {
  var chunks = [],
      i = 0,
      n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

function value(l) {
  let charCode = l.charCodeAt(0)
  if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
    return charCode-'a'.charCodeAt(0)+1
  }
  if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
    return charCode-'A'.charCodeAt(0)+27
  }

  throw "err3"
  return 
}

function p(e) {
  return new Set(e.split(''))
}

function do2(e) {
  return [...getIntersection(getIntersection(p(e[0]), p(e[1])), p(e[2]))][0]
}

console.log([input.split("\n").map(splitInHalf).map(e => findSame(e[0], e[1])).map(value).reduce((a, b) => a+b), chunk(input.split("\n"), 3).map(do2).map(value).reduce((a, b) => a + b)])


