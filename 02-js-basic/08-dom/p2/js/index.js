// 每隔一段时间，切换英雄的图片，让英雄动起来

// 每隔一段时间，改变英雄的位置，让英雄向右移动
var img = document.querySelector("img");
var index = 1;
setInterval(() => {
  img.src = `./img/${(index % 4) + 1}.png`;
  index++;
  img.style.left = index * 5 + "px";
}, 100);
console.log(img);
