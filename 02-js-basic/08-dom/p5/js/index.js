// 输入待办事项，按下回车后，添加事项到列表
var listDom = document.querySelector(".todo-list");
var input = document.querySelector(".txt");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (this.value) {
      var li = document.createElement("li");
      var span = document.createElement("span");
      var button = document.createElement("button");
      span.innerText = this.value;
      button.innerText = "删除";
      // 点击删除后，删除对应的待办事项
      button.addEventListener("click", function () {
        li.remove();
      });
      li.appendChild(span);
      li.appendChild(button);
      listDom.appendChild(li);
      this.value = "";
    }
  }
});
