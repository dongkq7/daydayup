// 斐波那契
function f(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return f(n-1) + f(n-2)
}
console.log('第七个数字的值：', f(7))