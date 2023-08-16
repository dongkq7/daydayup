// 让便签可被拖动，但不能超出视口
const moveBar = document.querySelector(".move-bar");
const note = document.querySelector(".note");

moveBar.onmousedown = function (e) {
  // 获取按下时鼠标相对于视口的横纵坐标
  const mx = e.clientX;
  const my = e.clientY;
  // 鼠标按下时元素相对于视口的位置
  const rect = moveBar.getBoundingClientRect();
  const ex = rect.left;
  const ey = rect.top;

  // 获取视口宽高与元素自身宽高计算横纵方向移动最大距离
  const maxX = document.documentElement.clientWidth - note.offsetWidth;
  const maxY = document.documentElement.clientHeight - note.offsetHeight;
  window.onmousemove = function (e) {
    // 鼠标移动距离
    const disX = e.clientX - mx;
    const disY = e.clientY - my;
    // 根据鼠标移动距离，计算元素新的left与top
    let left = ex + disX;
    let top = ey + disY;
    if (left < 0) {
      left = 0;
    }
    if (left > maxX) {
      left = maxX;
    }
    if (top < 0) {
      top = 0;
    }
    if (top > maxY) {
      top = maxY;
    }
    note.style.left = left + "px";
    note.style.top = top + "px";
  };
  window.onmouseup = function () {
    // 鼠标抬起不再监听鼠标移动和鼠标抬起
    window.onmousemove = null;
    window.onmouseup = null;
  };
};
