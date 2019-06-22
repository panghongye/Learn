let arr = [1, 2, 3, 4, 5]

let s = arr.reduce((previous, current, index, arr) => {
  return previous + current
}, 0)

s