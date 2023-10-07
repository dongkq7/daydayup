async function test() {
  return 1
}
console.log(test()) // Promise {1}

async function test2() {
  return new Promise(resolve => {
    resolve(123)
  }) 
}
console.log(test2()) // Promise{<pending>}
console.log(test2().then(res => {
  console.log(res) // 123
}))

async function test3() {
  throw new Error('error')
}
console.log(test3()) // Promise{<rejected> Error: error}