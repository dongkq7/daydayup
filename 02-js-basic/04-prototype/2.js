// toString方法属于Object.prototype，它会把对象转换为字符串的形式 [object Object]
// 这种格式并非每个对象想要的
// 1. 解释数组的toString为什么能得到不同的格式
// 2. 如果自己的构造函数希望改变toString，如何改变

// 1.这是因为数组原型上去改写了toString方法，此时数组实例沿着原型链在自己的构造函数Array中找到了toString方法，就不会继续沿着原型链去Object原型上去寻找了。
var arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3
console.log(Array.prototype.toString === Object.prototype.toString); // false
// arr使用Object原型上的toString方法
console.log(Object.prototype.toString.call(arr)); // [object Array]

// 2

function Person() {}
Person.prototype.toString = function () {
  console.log("改变了toString..");
};

var p = new Person();
p.toString();
