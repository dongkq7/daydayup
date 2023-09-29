const titles = document.querySelectorAll('.menu .title')
const menuItemHeight = 30 // 子菜单每一项的高度
const allSubmenus = document.querySelectorAll('.sub-menu')

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
  submenu.style.height = submenu.children.length * menuItemHeight + 'px'
}

/**
 * 关闭子菜单
 * @param {object} submenu  子菜单 dom 对象
 */
function closeSubMenu(submenu) {
  submenu.style.height = '0px'
}
/**
 * 切换子菜单打开与关闭
 * @param {object} submenu  子菜单 dom 对象
 */
function toggleSubMenu(submenu) {
  if(submenu.clientHeight) {
    closeSubMenu(submenu)
  } else {
    // 关闭其他子菜单
    allSubmenus.forEach(sub => {
      if (sub !== submenu) {
        closeSubMenu(sub)
      }
    })
    openSubMenu(submenu)
  }
}