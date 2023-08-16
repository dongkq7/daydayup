// 输入待办事项，按下回车后，添加事项到列表
var listDom = document.querySelector(".todo-list");
var input = document.querySelector(".txt");

function addTask(value) {
  listDom.innerHTML += `
    <li>
      <span>${value}</span>
      <button>删除</button>
    </li>
  `;
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (this.value.trim()) {
      addTask(this.value.trim());
      this.value = "";
    }
  }
});

// 事件委托 - 点击删除按钮删除添加的任务
listDom.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});
