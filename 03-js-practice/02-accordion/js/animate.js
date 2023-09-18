function createAnimation(options) {
  let from = options.from // 初始值
  const to = options.to // 目标值
  const totalTime = options.totalTime || 1000 // 动画执行总时间
  const duration = options.duration || 15 // 每次动画需要执行的时间
  const times = Math.floor(totalTime / duration) // 动画需要执行的总次数
  const dis = (to - from) / times // 每次执行动画变化的值
  let currentTimes = 0
  const timer = setInterval(() => {
    from += dis
    currentTimes++
    if (currentTimes >= times) {
      from = to
      clearInterval(timer)
      options.onend && options.onend()
    }
    options.onmove && options.onmove(from)
  }, duration)

}