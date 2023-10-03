/**
 * 1. then 方法会返回新的 Promise 对象
 * 若新 Promise 对象任务中没有对上一个任务进行处理，那么该Promise 的状态与接收到的数据与上一个 Promise 对象保持一致
 */
const p1 = new Promise((resolve, reject) => {
  resolve('success')
})
//  p2 只处理了失败的情况，没有处理 p1成功的情况
const p2 = p1.then(null, () => {
  throw new Error('error')
})
setTimeout(() => {
  console.log(p2) // [[PromiseState]]:  "fulfilled" [[PromiseResult]]: "success"
  
})

// const p3 = new Promise((resolve, reject) => {
//   reject(new Error('error'))
// })
// //  p4 只处理了成功的情况，没有处理 p3 失败的情况
// const p4 = p3.then(result => {
//   console.log(result)
// })
// setTimeout(() => {
//   console.log(p4) //[[PromiseState]]: "rejected" [[PromiseResult]]: Error
// })

/**
 * 若新 Promise 中对上一个 Promise 结果执行了处理，
 * 但是上一个 Promise 此时还未处理完毕，那么新 Promise 此时将处于 pending 状态。
 */
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(123)
  }, 2000)
})
const p6 = p5.catch(() => {
  console.log('处理了失败的情况...')
})
setTimeout(() => {
  console.log(p6) // [[PromiseState]]: "pending"[[PromiseResult]]: undefined
}, 1000)

/**
 * 若新 Promise 中对上一个 Promise 任务进行了处理，那么该 Promise 的状态与数据则与处理过程有关
 *  ● 如果新 Promise 中处理过程抛出了异常，或其中代码执行有异常，那么新 Promise 的状态为 rejected
 *  ● 若新 Promise 中处理过程无异常，则该 Promise 状态为 fulfilled，数据为其返回的数据
 *  ● 若新 Promise 中处理时又返回了一个Promise 对象，那么新 Promise 的状态与数据与返回的 Promise 有关
 */

const p7 = new Promise((resolve, reject) => {
  reject(new Error('error'))
})
const p8 = p7.catch(() => {
  return 123
})
setTimeout(() => {
  console.log(p8) // [[PromiseState]] : "fulfilled"[[PromiseResult]]: 123
})
const p9 = p7.catch(() => {
  return new Promise((resolve, reject) => {})
})
setTimeout(() => {
  console.log(p9) // [[PromiseState]]: "pending"[[PromiseResult]]: undefined
})