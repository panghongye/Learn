function A() {
  let a = 10
  return {
    g() { return a },
    s(v) { a = v },
    get a1() { return a }
  }
}

class B {
  constructor() {
    let value;
    this.g = () => value
    this.s = (v) => { value = v }
  }
}

