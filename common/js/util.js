function debounce (fn, delay) {
  var timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

module.exports.util = {
  debounce: debounce
}