function $(selector) {
  return document.querySelector(selector);
}

/**
 * 根据协议的多选框是否选中设置注册按钮状态
 */
function setSubmitButtonStatus() {
  var checked = $("input[type='checkbox']").checked;
  $("button[type=submit]").disabled = !checked;
}

/**
 * 根据手机号文本框中的文本，设置发送验证码按钮的状态
 */
function setSendCodeButtonStatus() {
  var isValid = $("#phone").value.length === 11;
  $(".captcha button").disabled = !isValid;
}

/**
 * 根据当前选中的爱好，设置已选择爱好文本
 */
function setSelectedLoves() {
  var selectedLoves = [];
  var options = $(".loves").children;
  for (let i = 0; i < options.length; i++) {
    var option = options[i];
    if (option.selected) {
      selectedLoves.push(option.innerText);
    }
  }
  $(".selected-loves").innerText += selectedLoves.join("、");
}

// 将上面的函数和用户事件连接
setSubmitButtonStatus();
setSendCodeButtonStatus();
$(".policy input").addEventListener("change", setSubmitButtonStatus);
$("#phone").addEventListener("input", setSendCodeButtonStatus);
$("select").addEventListener("change", setSelectedLoves);

// 给所有的文本框注册事件，若用户在输入的过程中按下了ESC，则将文本框清空
var txt = document.querySelectorAll(".txt");
for (let i = 0; i < txt.length; i++) {
  txt[i].addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "Escape") {
      this.value = "";
    }
  });
}
