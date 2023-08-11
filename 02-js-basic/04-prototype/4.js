// 创建一个没有隐式原型的用户对象，随意添加一些属性
// 方式1
var person = {
  name: "zhangsan",
  age: 18,
};

Object.setPrototypeOf(person, null);

// 方式2

var person2 = Object.create(null);
person2.name = "lisi";
person2.age = 20;
