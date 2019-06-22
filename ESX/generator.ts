// https://blog.csdn.net/qq_39300332/article/details/80000837

function* fibonacci() {
  let [prev, curr] = [1, 1]
  while (true) {
    [prev, curr] = [curr, prev + curr]
    yield curr
    console.log(curr)
  }
}

function Fibonacci(n: number): number {
  if (n === 1 || n === 2) return 1

  let ac: IteratorResult<number>
  const fibo = fibonacci()
  for (let i = 2; i < n; i++) {
    ac = fibo.next()
  }
  return ac.value
}

console.log(Fibonacci(10))
