// 根据hero.js提供的数据heros，创建合适的元素，将英雄数据显示到页面上
{
  /* <a href="https://pvp.qq.com/web201605/herodetail/528.shtml" target="_blank" class="item">
      <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/514/514.jpg" alt="" />
      <span>亚连</span>
    </a> */
}
var container = document.querySelector(".container");

function createHero(hero) {
  var a = document.createElement("a");
  a.href = `https://pvp.qq.com/web201605/herodetail/${hero.ename}.shtml`;
  a.target = "_blank";
  a.className = "item";
  var img = document.createElement("img");
  img.src = `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg`;
  img.alt = hero.cname;
  a.appendChild(img);
  var span = document.createElement("span");
  span.innerText = hero.cname;
  a.appendChild(span);
  container.appendChild(a);
}
for (let i = 0; i < heros.length; i++) {
  createHero(heros[i]);
}
