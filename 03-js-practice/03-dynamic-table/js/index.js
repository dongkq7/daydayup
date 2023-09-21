const checkAll = document.querySelector('#check-all')
const tbody = document.querySelector('tbody')
const checkedList = tbody.querySelectorAll('input[type=checkbox]')
const ths = document.querySelectorAll('th')
const rows = document.querySelectorAll('tbody tr')
const rowList = [...rows] // 类数组处理成数组，方便调取数组的 sort 方法进行排序
checkAll.addEventListener('click', handleCheckAll)
tbody.addEventListener('click', handleCheckedList)
ths.forEach((th, index) => {
  th.addEventListener('click', handleThClick.bind(th, index))
})

// 全选/全不选
function handleCheckAll() {
  checkedList.forEach(node => {
    node.checked = this.checked
  })
}

// 处理tbody 的 checkbox
function handleCheckedList(e) {
  if (e.target.tagName !== 'INPUT') {
    return
  }
  let checkedCount = 0
  checkedList.forEach(node => {
    if (node.checked) {
      checkedCount++
    }
  })
  checkAll.checked = checkedList.length === checkedCount
}

// 点击标题实现排序
function handleThClick(index) {
  // 如果点击的是复选框则不进行处理
  if (index === 0) {
    return
  }
  let sortedArr = []
  // 比较 tbody 中所有行对应的index 位置的 td 中的内容
  if (index === 2 || index === 4) {
    // 点击的是姓名或职位，则按照中文字符集进行比较
    sortedArr = rowList.sort((a, b) => {
      const aTds = a.querySelectorAll('td')
      const bTds = b.querySelectorAll('td')
      return aTds[index].innerHTML.localeCompare(bTds[index].innerHTML, 'zh')
    })
  } else {
    // 点击的编号和年龄，则直接比较数字，通过 sort 方法即可
    sortedArr = rowList.sort((a, b) => {
      const aTds = a.querySelectorAll('td')
      const bTds = b.querySelectorAll('td')
      return aTds[index].innerHTML - bTds[index].innerHTML
    })
  }
  sortedArr.forEach(tr => {
    tbody.appendChild(tr)
  })
}