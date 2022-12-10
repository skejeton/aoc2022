let input = document.body.innerText.trim()

function doesPairContain1(p, c) {
  return c[0] >= p[0] && c[1] <= p[1]
}

function doesPairContain2(p, c) {
  return c[1] >= p[0] && c[0] <= p[1]
}

function pairCheck(fn, p) {
  return fn(p[0], p[1]) || fn(p[1], p[0])
}

console.log([input.split('\n').map(p => 
  pairCheck(doesPairContain1, p.split(',').map(e => e.split('-').map(e => parseInt(e))))
).reduce((a, b) => a + (b ? 1 : 0)), input.split('\n').map(p => 
  pairCheck(doesPairContain2, p.split(',').map(e => e.split('-').map(e => parseInt(e))))
).reduce((a, b) => a + (b ? 1 : 0))])