const titles = document.querySelectorAll('.menu .title')
const menuItemHeight = 30 // 子菜单每一项的高度

for(let i = 0; i < titles.length; i++) {
  titles[i].onclick = function() {
    toggleSubMenu(this.nextElementSibling)
  }
}

/**
 * 打开子菜单
 * @param {object} submenu  子菜单 dom 对象
 */
function openSubMenu(submenu) {
  const status = submenu.getAttribute('status')
  // 如果菜单不处于关闭状态则表示菜单要么已经打开要么在打开过程中，则不进行再次打开
  if (status && status !== 'closed') {
    return
  }
  submenu.setAttribute('status', 'playing')
  // 调取封装的animate动画函数打开菜单
  createAnimation({
    from: 0,
    to: submenu.children.length * menuItemHeight,
    totalTime: 600,
    onmove: function(n) {
      submenu.style.height = n + 'px'
    },
    onend: function() {
      submenu.setAttribute('status', 'opened')
    }
  })
}

/**
 * 关闭子菜单
 * @param {object} submenu  子菜单 dom 对象
 */
function closeSubMenu(submenu) {
  const status = submenu.getAttribute('status')
  // 如果菜单处于非打开状态（关闭状态或关闭过程中）则不处理
  if (status !== 'opened') {
    return
  }
  submenu.setAttribute('status', 'playing')
  // 调取封装的animate动画函数打开菜单
  createAnimation({
    from: submenu.children.length * menuItemHeight,
    to: 0,
    totalTime: 600,
    onmove: function(n) {
      submenu.style.height = n + 'px'
    },
    onend: function() {
      submenu.setAttribute('status', 'closed')
    }
  })
}
/**
 * 切换子菜单打开与关闭
 * @param {object} submenu  子菜单 dom 对象
 */
function toggleSubMenu(submenu) {
  const status = submenu.getAttribute('status')
  if(status === 'opened') {
    closeSubMenu(submenu)
  }
  if (status === 'closed' || !status) {
    // 关闭之前打开的菜单
    const openedMenu = document.querySelector('.sub-menu[status=opened]')
    openedMenu && closeSubMenu(openedMenu)
    openSubMenu(submenu)
  }
}