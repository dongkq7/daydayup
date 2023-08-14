// 普通会员的构造函数
function User(username, password) {
  // this = {}
  this.username = username;
  this.password = password;
}
User.prototype.playFreeVideo = function () {
  console.log("观看免费视频");
};

// VIP会员的构造函数
function VIPUser(username, password, expires) {
  // this = {}
  User.call(this, username, password);
  this.expires = expires;
}

VIPUser.prototype.playPayVideo = function () {
  console.log("观看付费视频");
};

function inherit(Child, Parent) {
  Object.setPrototypeOf(Child.prototype, Parent.prototype);
}

// 完成原型上的变化: 让VIPUser原型的隐式原型指向User原型
inherit(VIPUser, User);

var vip = new VIPUser("zhangsan", "123", "2023-10-01");

vip.playFreeVideo();
