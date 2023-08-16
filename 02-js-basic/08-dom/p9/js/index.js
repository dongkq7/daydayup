// 让小球向右下运动，遇到边缘后反弹
const ball = document.querySelector(".ball");
// 运动距离
let disX = 2;
let disY = 2;
const dw = document.documentElement.clientWidth;
const dh = document.documentElement.clientHeight;
// 小球x方向移动的最大距离
const maxX = dw - ball.offsetWidth;
// 小球y方向移动的最大距离
const maxY = dh - ball.offsetHeight;

setInterval(function () {
  const rect = ball.getBoundingClientRect();
  let left = rect.left + disX;
  let top = rect.top + disY;
  if (left < 0) {
    left = 0;
    disX = -disX;
    changeColor();
  }
  if (left > maxX) {
    left = maxX;
    disX = -disX;
    changeColor();
  }
  if (top < 0) {
    top = 0;
    disY = -disY;
    changeColor();
  }
  if (top > maxY) {
    top = maxY;
    disY = -disY;
    changeColor();
  }
  ball.style.left = left + "px";
  ball.style.top = top + "px";
}, 10);

function changeColor() {
  ball.style.backgroundColor = `rgb(${randomNumber(0, 222)},${randomNumber(
    0,
    222
  )},${randomNumber(0, 222)})`;
}
// 随机变色
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
