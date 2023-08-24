const scrollHeight = document.querySelector('.scroll-item').clientHeight
const scrollBox = document.querySelector('.scroll-box')
let scrollIndex = 0

// function scrollText() {
//   setInterval(() => {
//     scrollIndex++
//     if (scrollIndex > scrollBox.children.length - 1) {
//       scrollIndex = 0
//     }
//     scrollBox.scrollTop = scrollHeight * scrollIndex
//   }, 1000)
// }
// scrollText()

// 克隆第一个节点添加到最后，实现无缝滚动
function cloneElement() {
  const firstElement = scrollBox.firstElementChild
  scrollBox.appendChild(firstElement.cloneNode(true))
}
cloneElement()

let timer = null
const DURATION = 2000 // 多久滚动一次
const SCROLL_TOTAL = 300 // 滚动动画时长
const SCROLL_PRE_TIME = 10
// 300毫秒动画执行完毕，10毫秒执行一次，需要执行30次
const times = SCROLL_TOTAL / SCROLL_PRE_TIME
function scrollText() {
  setInterval(() => {
    // 计算需要从哪里滚动到哪里（为添加动画效果做准备）
    let from = scrollIndex * scrollHeight
    scrollIndex++
    const to = scrollIndex * scrollHeight
    // 步长：每次滚动的距离
    const step = (to - from) / times
    // 滚动动画
    timer = setInterval(() => {
      from += step
      if (from >= to) {
        clearInterval(timer)
        // 滚动到了最后一个元素，那么重置scrollIndex与from
        if (scrollIndex === scrollBox.children.length - 1) {
          scrollIndex = 0
          from = 0
        }
      }
      scrollBox.scrollTop = from
    }, SCROLL_PRE_TIME)
  }, DURATION)
}
scrollText()