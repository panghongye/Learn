Function.prototype.myCall = function (context) {
  if (context === 'undefined' || context === null) context = {}
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}


console.log(Math.max.myCall(null, ...[1, 2, 3, 4]))



Function.prototype.myApply = function (context) {
  if (context === 'undefined' || context === null) context = {}
  context.fn = this
  let args = arguments[1]
  let result
  if (args) {
    result = context.fn(...args)
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let _this = this
  let args = [...arguments].slice(1)
  return function F() {
    // 判断是否被当做构造函数使用
    if (this instanceof F) {
      return _this.apply(this, args.concat([...arguments]))
    }
    return _this.apply(context, args.concat([...arguments]))
  }
}

