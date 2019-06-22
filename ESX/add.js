function add2(x) {
  return function s(y) {
    if (y) {
      x += y
      return s
    }
    return x;
  };
}


var curry = function (func, ...args) {
  return function (...args2) {
    var newArgs = args.concat(args2);
    newArgs
    return func.apply(null, newArgs);
  }
}

function add(...args) {
  return args
}

var addCurry = curry(add, 1, 2);
console.log(addCurry())

var addCurry = curry(add, 1);
console.log(addCurry(2))

var addCurry = curry(add);
console.log(addCurry(1, 2))



function add3(...args) {
  var fn = function (...args2) {
    var newArgs = args.concat(args2);
    return add3.apply(null, newArgs);
  }
  fn.toString = fn.valueOf = function () {
    return args.reduce(function (a, b) {
      return a + b;
    })
  }
  return fn;
}

console.log(add3(1)(2, 3))
console.log(add3(1)(2)(3)(4)(5))