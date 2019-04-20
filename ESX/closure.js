function A() {
  let a = 10
  return {
    g() { return a },
    s(v) { a = v },
    get a() { return a }
  }
}

class B {
  constructor() {
    let value;
    this.g = () => value
    this.s = (v) => { value = v }
  }
  g() {
    return 'B.prototype.g'
  }
}

