const provinceDom = document.querySelector('#province')
const cityDom = document.querySelector('#city')
const schoolDom = document.querySelector('#school')

/**
 * 渲染省份数据
 * 
 */
function initProvice() {
  const proviceFragment = document.createDocumentFragment()
  for(let pKey in province) {
    createOption(pKey, province[pKey],proviceFragment)
  }
  provinceDom.append(proviceFragment)
}
initProvice()

/**
 * 为省份select 绑定 change 事件，省份发生改变后则重新渲染城市下拉列表以及学校下拉列表
 */
provinceDom.onchange = function() {
  const provinceValue = this.value
  // 根据所选省份渲染城市列表
  createCityList(provinceValue)
}

/**
 * 根据所选省份，渲染城市列表
 */
function createCityList(provinceValue) {
  // 清空上一次渲染的数据，防止下拉列表中存在上一次所渲染的数据
  cityDom.innerHTML = ''
  // 根据所选省份获取城市下拉列表数据
  const cityListObj = city[provinceValue]
  // 由于有可能选择的省会是请选择，所以要判断一下是否获取到了城市列表数据
  if (cityListObj) {
    // 根据获取到的城市列表渲染城市下拉列表
    const cityFragment = document.createDocumentFragment()
    for(let cKey in cityListObj) {
      createOption(cKey, cityListObj[cKey], cityFragment)
    }
    cityDom.append(cityFragment)
  }
  // 根据所选省份渲染学校列表（改变省份后，获取到的城市列表会默认选中第一个）
  createSchoolList(cityDom.value)
}
/**
 * 根据所选城市，渲染学校列表
 */
function createSchoolList(cityValue) {
  // 清空上一次渲染的数据，防止下拉列表中存在上一次所渲染的数据
  schoolDom.innerHTML = ''
  const schoolList = allSchool[cityValue]
  const schoolFragment = document.createDocumentFragment()
  schoolList.forEach(s => {
    createOption(s,s,schoolFragment)
  })
  schoolDom.append(schoolFragment)
}

/**
 * 改变城市，重新渲染学校列表
 */
cityDom.onchange = function() {
  createSchoolList(this.value)
}

function createOption(value, text, fragment) {
  const option = document.createElement('option')
  option.value = value
  option.innerText = text
  fragment.append(option)
}