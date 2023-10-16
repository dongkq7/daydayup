// 登录、注册表单验证
class FieldValidator {
  /**
   * @param {string} inputId  输入框 ID
   * @param {Function} validateFun  验证方法
   */
  constructor(inputId, validateFun) {
    this.input = $(`#${inputId}`)
    this.validateFun = validateFun
    this.p = this.input.nextElementSibling;
    this.input.onblur = () => {
      this.validate()
    }
  }
  async validate() {
    const err = await this.validateFun(this.input.value)
    if (err) {
      this.p.innerText = err
      return false
    } else {
      this.p.innerText = ''
      return true
    }
  }
  // 统一验证：比如点击注册按钮、登录按钮时
  static async validate(...validators) {
    const promiseArr = validators.map(v => v.validate())
    const reuslt = await Promise.all(promiseArr)
    return reuslt.every(r => r)
  }
}