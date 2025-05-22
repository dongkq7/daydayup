/**
 * 实现new
 * 1. 创建一个空对象
 * 2. 让空对象的 __proto__ 属性指向构造函数的 prototype 属性
 * 3. 让 this 指向该对象
 * 4. 如果该构造函数没有返回函数或者对象，那么则返回该对象
 */

function Computer(name, price) {
  this.name = name;
  this.price = price;
}

const cp1 = new Computer("apple", 20000);
console.log(cp1);

function _new(target) {
  // 1.创建一个空对象
  const newObj = {};
  // 2.让空对象的__proto__指向构造函数的prototype
  newObj.__proto__ = target.prototype;
  // 3.拿到传入的参数，执行构造函数并让this指向新对象
  const params = Array.prototype.slice.call(arguments, 1);
  const result = target.apply(newObj, params);
  // 4. 判断返回值，如果是函数或对象那么直接返回，否则返回该对象
  if (result !== null && /function|object/.test(typeof result)) {
    return result;
  }
  return newObj;
}

const cp2 = _new(Computer, "xiaomi", 10000);
console.log(cp2); // Computer { name: 'xiaomi', price: 10000 }
console.log(cp2.__proto__ === Computer.prototype); // true
