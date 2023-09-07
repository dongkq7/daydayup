// 阶乘
function m(n) {
  if (n === 1) {
    return 1
  }
  return n * m(n-1)
}
console.log('5的阶乘：', m(5))