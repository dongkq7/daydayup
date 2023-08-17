// ES5
(function () {
  // 横幅区数据
  var datas = [
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
      link: 'https://www.mi.com/mi11le-5g-ne',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/xiaomipad5',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
    },
  ];

  function $(selector) {
    return document.querySelector(selector)
  }

  var banner = $('.banner')
  var bannerDots = $('.banner-dots')
  var bannerCover = $('.cover')
  var bannerImg = bannerCover.querySelector('img')

  var curIndex = 0; //当前是第几张轮播图
  var pointerLeft = $('.banner-pointer.left')
  var pointerRight = $('.banner-pointer.right')

  /**
   * 根据图片信息动态生成指示器
   */
  function init() {
    for(var i = 0; i < datas.length; i++) {
      var dot = document.createElement('span')
      dot.className = 'dot'
      bannerDots.appendChild(dot)
    }
    change(0)
  }
  init()

  /**
   * 根据索引改变轮播图信息
   * @param {number} index 
   */
  function change(index) {
    var banner = datas[index]
    // 改变轮播图信息
    bannerCover.href = banner.link
    bannerImg.src = banner.img

    // 改变指示器样式
    // 改变之前清除之前高亮的指示器
    var actived = bannerDots.querySelector('.active')
    if (actived) {
      actived.className = 'dot'
    }
    bannerDots.children[index].className = 'dot active'
  }

  /**
   * 向前切换轮播图
   */
  function toPrev() {
    curIndex--
    if (curIndex < 0) {
      curIndex = datas.length - 1
    }
    change(curIndex)
  }

  /**
   * 向后切换轮播图
   */
  function toNext() {
    curIndex++
    if (curIndex > datas.length - 1) {
      curIndex = 0
    }
    change(curIndex)
  }

  pointerLeft.onclick = toPrev
  pointerRight.onclick = toNext

  for(var i = 0; i < bannerDots.children.length; i++) {
    // ES5处理循环绑定的问题-生成函数作用域（通过闭包的方式来解决)
    // 直接采用let是最好的
    (function(i){
      var dot = bannerDots.children[i]
      dot.onclick = function() {
        curIndex = i
        change(i)
      }
    })(i)
  }

  // 开始轮播
  var timerId = null;
  function start() {
    if (timerId) {
      return
    }
    timerId = setInterval(toNext, 1000)
  }

  // 停止轮播
  function stop() {
    clearInterval(timerId)
    timerId = null
  }
  start()
  // 鼠标移入停止轮播
  banner.onmouseenter = stop
  // 鼠标移出开始轮播
  banner.onmouseleave = start

})();
