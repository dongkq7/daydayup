(async function() {
  async function getHeroes() {
    return fetch('https://study.duyiedu.com/api/herolist')
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }

  const doms = {
    ul: document.querySelector('.hero-list'),
    radios: document.querySelectorAll('.radio'),
    input: document.querySelector('input'),
  }

  const allHeroes = await getHeroes()
  setHeroHtml(allHeroes)

  // 根据英雄数据渲染英雄列表
  function setHeroHtml(heros) {
    doms.ul.innerHTML = heros.map(hero => `
      <li class="hero">
      <a href="https://pvp.qq.com/web201605/herodetail/${hero.ename}.shtml" target="_blank">
        <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg" alt="">
        <span>${hero.cname}</span>
      </a>
    </li>
    `).join('')
  }

  // 添加单选框点击事件
  for(const radio of doms.radios) {
    radio.addEventListener('click', function() {
      // 变更radio样式
      setChoose(this)
      searchHeros(this)
    })
  }
  // 添加输入框输入事件
  doms.input.addEventListener('input', function () {
    const heroes = allHeroes.filter((h) => h.cname.includes(this.value));
    setHeroHtml(heroes);
    // 设置全部为选中状态
    setChoose(document.querySelector(".radio[data-type='all']"));
  });
  // 根据radio中提供的自定义属性，查询英雄数据，然后设置html
  function searchHeros(radio) {
    let heroes;
    // const type = radio.getAttribute('data-type');
    const type = radio.dataset.type;
    const value = radio.dataset.value;
    if (type === 'all') {
      heroes = allHeroes;
    } else if (type === 'pay_type') {
      heroes = allHeroes.filter((h) => h.pay_type === +value);
    } else {
      heroes = allHeroes.filter(
        (h) => h.hero_type === +value || h.hero_type2 === +value
      );
    }
    setHeroHtml(heroes);
  }

  function setChoose(radio) {
    // 移除上一个被选中 radio 样式
    const checkedRadio = document.querySelector('.radio.checked')
    checkedRadio && checkedRadio.classList.remove('checked')
    radio.classList.add('checked')
  }
})()