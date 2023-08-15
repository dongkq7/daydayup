// 每隔1秒自动切换图片
var img = document.querySelector(".container img");
var timerId = null;
var index = 1;
function start() {
  if (timerId) {
    return;
  }
  timerId = setInterval(function () {
    img.src = `./img/${(index % 4) + 1}.jpeg`;
    index++;
  }, 1000);
}
function stop() {
  clearInterval(timerId);
  timerId = null;
}
// 当鼠标移动到元素上时停止切换，移出后开始切换
img.addEventListener("mouseenter", start);
img.addEventListener("mouseleave", stop);
