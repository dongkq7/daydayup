// 完成表单验证
const form = document.querySelector(".form-container");

/**
 * 验证账号
 * @returns {boolean} true 验证通过 false验证不通过
 */
function validateAccount() {
  const formItem = document.querySelector(".form-item.account");
  const input = formItem.querySelector("input");
  const p = formItem.querySelector(".msg");

  const value = input.value.trim();
  let errorText = "";
  if (!value) {
    errorText = "请输入账号";
  } else if (value.length < 6 || value.length > 12) {
    errorText = "请输入6-12位长度的账号";
  }
  p.innerText = errorText;
  errorText ? formItem.classList.add("err") : formItem.classList.remove("err");
  return !errorText;
}

/**
 * 验证密码
 * @returns {boolean} true 验证通过 false验证不通过
 */
function validatePassword() {
  const formItem = document.querySelector(".form-item.password");
  const input = formItem.querySelector("input");
  const p = formItem.querySelector(".msg");

  const value = input.value.trim();
  let errorText = "";
  if (!value) {
    errorText = "请输入密码";
  } else if (value.length < 6) {
    errorText = "密码长度不足6位";
  }
  p.innerText = errorText;
  errorText ? formItem.classList.add("err") : formItem.classList.remove("err");
  return !errorText;
}

/**
 * 验证整个表单
 * @returns {boolean} true 整个表单通过验证
 */
function validateForm() {
  const r1 = validateAccount();
  const r2 = validatePassword();
  return r1 && r2;
}

const accountInput = document.querySelector(".form-item.account");
const passwordInput = document.querySelector(".form-item.password");
accountInput.addEventListener("input", validateAccount);
passwordInput.addEventListener("input", validatePassword);

form.addEventListener("submit", function (e) {
  const result = validateForm();
  // 表单验证不通过，阻止提交表单提交的默认行为
  if (!result) {
    e.preventDefault();
  }
});
