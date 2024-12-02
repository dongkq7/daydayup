const doms = {
  video: document.querySelector('video'),
  progress: {
    //进度条
    range: document.querySelector('#progress input'),
    // 当前播放时间
    current: document.querySelector('#current'),
    // 总时间
    total: document.querySelector('#total'),
  },
  rate: document.querySelector('#rate'),
  volume: {
    range: document.querySelector('#volume input'),
    text: document.querySelector('#volume span'),
  },
  controls: document.querySelectorAll('.controls'),
  rateBtns: document.querySelectorAll('#rate button'),
  btnPlay: document.querySelector('#btnPlay'),
  save: document.querySelector('#save'),
  load: document.querySelector('#load'),
}


// 视频第一帧数据加载完成后去做初始化操作
doms.video.addEventListener('loadeddata', init)

function init() {
  // 展示进度
  setProgress()
  // 设置倍率
  setRate()
  // 设置音量
  setVolume()
  for(let i = 0; i < doms.controls.length; i++) {
    doms.controls[i].style.display = 'block'
  }
}

function setProgress() {
  // 设置显示的文本 当前时间/总时间
  doms.progress.current.innerText = formatTime(doms.video.currentTime)
  doms.progress.total.innerText = formatTime(doms.video.duration)
  // 设置进度条的值
  doms.progress.range.value = doms.video.currentTime / doms.video.duration * 100
}

function setRate() {
  const currentRate = doms.video.playbackRate
  for (let i = 0; i < doms.rateBtns.length; i++) {
    const currentBtn = doms.rateBtns[i]
    if (+currentBtn.dataset.rate == currentRate) {
      currentBtn.classList.add('active')
    } else {
      currentBtn.classList.remove('active')
    }
  }
}

function setVolume() {
  let currentVolume = parseInt(doms.video.volume * 100)
  // 静音状态下将音量设置为0
  if (doms.video.muted) {
    currentVolume = 0
  }
  doms.volume.range.value = currentVolume
  doms.volume.text.innerText = currentVolume + '%'
}

function formatTime(sec) {
  const hours = Math.floor(sec / 3600)
  sec -= hours * 3600
  const minutes = Math.floor(sec / 60)
  sec -= minutes * 60
  const seconds = Math.floor(sec)
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`

  function padTime(num) {
    return (num + '').padStart(2, '0')
  }
}

doms.btnPlay.addEventListener('click', function() {
  if (doms.video.paused) {
    doms.video.play()
  } else {
    doms.video.pause()
  }
})

doms.progress.range.addEventListener('input', function() {
  // 拖动进度条更新当前视频播放时间
  doms.video.currentTime = (this.value / 100) * doms.video.duration
  // 重新设置进度
  setProgress()
})

doms.video.addEventListener('timeupdate', setProgress)

for(let i = 0; i < doms.rateBtns.length; i++) {
  doms.rateBtns[i].addEventListener('click', function() {
    doms.video.playbackRate = +this.dataset.rate
    setRate()
  })
}

doms.volume.range.addEventListener('input', function() {
  doms.video.volume = this.value / 100
  setVolume()
})

doms.save.addEventListener('click', function() {
  const saveObj = {
    currentTime: doms.video.currentTime,
    rate: doms.video.playbackRate,
    volume: doms.video.volume
  }
  localStorage.setItem('video-data', JSON.stringify(saveObj))
})

doms.load.addEventListener('click', function() {
  const json = localStorage.getItem('video-data') || ''
  if (json) {
    const loadObj = JSON.parse(json)
    doms.video.currentTime = loadObj.currentTime
    doms.video.playbackRate = loadObj.rate
    doms.video.volume = loadObj.volume
    setProgress()
    setRate()
    setVolume()

    doms.video.play()
  }
})
