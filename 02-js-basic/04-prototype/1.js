// 为所有对象添加方法print，打印对象的键值对
Object.prototype.print = function () {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      console.log(`${key}-${this[key]}`);
    }
  }
};

var obj = {
  a: 1,
  b: 2,
};

var obj2 = {
  c: 2,
  d: 3,
};
obj.print();
obj2.print();
