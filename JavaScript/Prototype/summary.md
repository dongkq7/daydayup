# 生产对象的方式

要理解原型链，首先需要理解原型：

这么多的编程语言，创建对象的方式整体来讲，可以分为两种：

- **基于类**：有一个 class，然后要得到对象通过 new 的方式（ Java、 C++、PHP、Ruby、Python ）
- **基于原型**：有一个原始的对象，然后要创建新对象通过克隆原有的对象，被克隆的对象称之为新对象的原型对象（ JS ）

在早期的时候，JS 也可以模拟出基于类来创建对象的方式（迫于公司高层的压力），是通过函数来进行模拟，但实际上低层也还是基于原型来实现的

所有的对象都是通过`new 函数`的方式来创建的。

比如：

```javascript
function People(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}
// 把方法要写到原型上
People.prototype.sayHello = function () {
  console.log('你好，我是' + this.name + '我今年' + this.age + '岁了');
}

var xiaoming = new People('小明', 12, '男');
var xiaohong = new People('小红', 11, '女');

console.log(xiaoming.sayHello === xiaohong.sayHello); // true

xiaoming.sayHello();
xiaohong.sayHello();
```

![image-20250522134710036](/Users/dongkaiqi/Library/Application Support/typora-user-images/image-20250522134710036.png)

# 原型要解决的问题

比如我们现在有如下的构造函数，根据name和age来创建不同的person对象。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log("你好，我是" + this.name + "，今年" + this.age + "岁了");
  };
}

var p1 = new Person("张三", 20);
var p2 = new Person("李四", 88);
```

可见这种方式创建出来的对象都会有一个sayHi方法，但是sayHi方法逻辑是一样的，并且每个对象的sayHi方法都是不一样的，存储在不同的地址。这样就会造成内存空间的浪费。

既然方法逻辑都是一样的就没必要为每个person都单独生成一个sayHi方法。那么如何来解决呢？就是要通过原型来解决。

原型是如何解决的呢？

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1747892708527-85d1a733-2bdb-410d-ba33-501b7f3f0dfd.png)

1.  **原型**
   每个函数都会自动附带一个属性`prototype`，这个属性的值是一个普通对象，称之为原型对象

既然是一个对象，就可以往该对象中放各种东西

2.  **实例**
   instance，通过`new`产生的对象称之为实例。 

由于JS中所有对象都是通过`new`产生的，因此，严格来说，JS中所有对象都称之为实例

3. **隐式原型**
   每个实例都拥有一个特殊的属性`__proto__`，称之为隐式原型，它指向构造函数的原型 

**原型存在的意义：**

之所以要挂在原型对象上面，是因为由**构造函数实例化出来的每一个实例对象，属性值是不相同的，所以需要每个对象独立有一份**。

但是**对于方法而言，所有对象都是相同的，因此我们不需要每个对象拥有一份，直接挂在原型对象上面共用一份即可**。

**当访问实例成员时，先找自身，如果不存在，会自动从隐式原型中寻找。这样一来，我们可以把那些公共成员，放到函数的原型中，即可被所有实例共享**

那么以上代码就可以改写成：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function () {
  console.log("你好，我是" + this.name + "，今年" + this.age + "岁了");
};
var p1 = new Person("张三", 20);
var p2 = new Person("李四", 88);
p1.sayHi();
p2.sayHi();
```

# 什么是原型链

事实上，原型本身也是一个对象，默认情况下是通过new Object来创建的，因此上面的People.prototype的隐式原型指向Object.prototype，这样就产生了以下的关联关系：

![image-20250522134759321](/Users/dongkaiqi/Library/Application Support/typora-user-images/image-20250522134759321.png)

可以看出xiaomi实例的隐式原型就形成了一个链条，这个就被称为原型链

- 当读取对象成员时，会先看对象自身是否有该成员。如果没有就依次在其原型链上查找。

# 完整的原型链

1. 通过自定义函数 new 出实例，实例的隐式原型指向构造函数的原型对象，`实例.proto=== 构造函数.prototype`

2. 构造函数的原型本身也是一个对象，通过 new Object 可以得到，所以`构造函数.__proto === Object.prototype`

3. 任何函数都可以看作是Function new出来的，那么自定义的构造函数以及Object也是函数，它是不是Function new出来的呢？答案是肯定的，所以Function与Object之间以及任何构造函数与Function之间也会形成关系:

​	`构造函数.__proto__===  Function.prototype`

​	这也是为什么所有自定义函数都可以使用 `call` 和 `apply` ？

​	**是因为自定义函数都是通过 new Function 而来**，其__proto__指向 Function 的原型，call 和 apply 方法均在 Function 的 prototype 上

4. 而Function.prototype本身也是一个对象，所以Function.prototype的__proto__又会指向Object.prototype

- Function本身也是一个函数，所以可以看成它自己new了它自己，所以其__proto__指向Function.prototype

![image-20250522135004942](/Users/dongkaiqi/Library/Application Support/typora-user-images/image-20250522135004942.png)

总得来说：

- JS 中的对象大体上分为两大类：**普通对象** 和 **构造器对象**

- 无论是 **普通对象** 还是 **构造器对象**，都会有自己的原型对象，通过 _*proto*_ 这个隐式属性，就能找到自己的原型对象，并且**一直向上找，最终会到达 null

- **普通对象** 和 **构造器对象** 的区别在于是否能够实例化，**构造器对象**可以通过 new 的形式创建新的实例对象，这些实例对象的原型对象一直往上找最终仍然是到达 null

- 只有 **构造器对象** 才有 prototype 属性，其 prototype 属性指向实例对象的原型对象

- 所有 **构造器对象** 的原型对象均为 Function.prototype

- 无论是 **普通对象** 还是 **构造器对象**，最终的 constructor 指向 Function，而 Function 的 constructor 指向自己本身。

- Object 这个 **构造器对象** 比较特殊，实例化出来的对象的原型对象直接就是 Object.prototype，而其他的构造器对象，其实例对象的原型对象为对应的 xxx.prototype，再往一层才是 Object.prototype

  

# 最佳实践

虽然我们能够轻松的给内置的构造器函数添加属性和方法：

```javascript
Number.prototype.isEven = function () {
    return this % 2 === 0;
}
Number.prototype.isOdd = function () {
    return this % 2 === 1;
}
const i = 42;
console.log(i.isEven()); // true
const j = 13;
console.log(j.isOdd()); // true
```

但是**目前 JS 社区的大部分人都不推荐这么做，这样的做法往往被称之猴子补丁（monkey-patching）**

一种更好的最佳实践是继承想要修改的构造函数，在子类上面添加新的方法：

```javascript
class myNum extends Number{
    constructor(...args){
        super(...args);
    }
    zhangsan(){}
}
const i = new myNum(1);
i.zhangsan();
```

# 原型相关方法

## Object.getPrototypeOf

该方法用于查找一个对象的原型对象，其判断的不是原型链，是当前实例的隐式原型。

```javascript
function Computer(){}
const c = new Computer();
console.log(Object.getPrototypeOf(c) === c.__proto__);// true


const arr = [1, 2, 3, 4];

// Object.getPrototypeOf判断一个实例的隐式原型，只判断实例的当前隐式原型 不判断原型链
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(arr) === Object.prototype); // false
```

## instanceof

判断一个对象是否是一个构造函数的实例。如果是返回 *true*，否则就返回 *false*

- `instanceof` 用于判断一个对象的原型链上是否存在该构造函数的原型，可以理解成xx是不是一个xx

```javascript
function Computer(){}
const c = new Computer();
console.log(c instanceof Computer); // true
console.log(c instanceof Array); // false
console.log([] instanceof Array); // true

console.log({} instanceof Object); // true
console.log({}.toString instanceof Function); // true
console.log(Object instanceof Function); // true Object是一个函数
console.log(Function instanceof Object); // true 函数也是一个对象
```

## isPrototypeOf

主要用于检测一个对象是否是一个另一个对象的原型对象，如果是返回 true，否则就返回 false

- 是原型链上的原型对象都会返回true

```js
function Computer(){}
const c = new Computer();
console.log(Computer.prototype.isPrototypeOf(c)); // true
console.log(Computer.prototype.isPrototypeOf([])); // false
console.log(Array.prototype.isPrototypeOf([])); // true
console.log(Object.prototype.isPrototypeOf(c)); // true
```

## hasOwnProperty

判断一个属性是定义在对象本身上面还是从原型对象上面继承而来的。

如果是本身的，则返回 true，如果是继承而来的，则返回 false

```javascript
const person = {
  arm: 2,
  legs: 2,
  walk() {
    console.log("walking");
  },
};

const john = Object.create(person, {
  name: {
    value: "John",
    enumerable: true,
  },
  age: {
    value: 18,
    enumerable: true,
  },
});
console.log(john.hasOwnProperty("name")); // true
console.log(john.hasOwnProperty("arms")); // false
```

比如为所有对象添加print方法，打印键值对。

```javascript
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
```

- 一般会在原型方法中使用this，因为原型方法是由对象来发起调用的，this指向当前调用该方法的对象。
- hasOwnProperty用来判断该属性是否在自身实例上，会除去隐式原型上的属性
- 而in会遍历出对象中所有的属性，包括隐式原型上的属性

## Object.create

我们创建一个对象都会存在隐式原型，但是如果不想要隐式原型，不推荐通过以下方式来对__proto__进行修改，因为未来有可能__proto__给禁用掉：

```javascript
const obj = { a: 1, b: 2 };
obj.__proto__ = null;
```

我们可以通过以下两种方式来创建一个空原型对象：利用Object.create(target)

该方法返回一个对象，**该对象以target作为隐式原型**。那么我们就可以传递一个null，这样创建的对象就没有隐式原型了。

```javascript
const obj = Object.create(null);
obj.a = 1;
obj.b = 2;
```

那么如果我们希望创建的对象以数组的原型作为隐式原型，可以这样：

```javascript
const obj = Object.create(Array.prototype);
obj.push(1);
obj.push(2);
console.log(obj); // Array { '0': 1, '1': 2, length: 2 }
```

这也是创建数组的一种方式

 **补充**

Object.create 还可以接收第二个参数，第二个参数是一个对象，key 表示新对象中的属性，每个key 对应为一个属性描述符：其中包含了该属性的值(value)以及该属性是否能够被枚举出来(enumerable)等。

```javascript
const person = {
  smile() {
    console.log(this.name, 'smile..')
  }
}
const zs = Object.create(person, {
  name: {
    value: 'zhangsan',
    enumerable: true
  }
})
zs.smile()
console.log(zs)
```

![img](https://cdn.nlark.com/yuque/0/2023/png/22253064/1694436808425-a95562e7-aded-4ffb-8657-e59857b3c191.png)

## Object.setPrototypeOf(obj, prototype)

该方法可以将传入的obj对象的隐式原型设置为prototype

```javascript
const obj = {
  a: 1,
  b: 2,
};
Object.setPrototypeOf(obj, null);
```

# 原型相关的题目

## 题目1

toString方法属于Object.prototype，它会把对象转换为字符串的形式[object Object]。然而这个格式并非每个对象都想要的。

1. 解释数组的toString为什么能得到不同的格式

这是因为数组原型上添加了toString方法，此时数组实例沿着原型链在自己的构造函数Array中找到了toString方法，就不会继续沿着原型链去Object原型上去寻找了。

```javascript
var arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3
console.log(Array.prototype.toString === Object.prototype.toString); // false
```

2. 如果数组中的toString方法想使用Object原型上的toString方法怎么办呢？

```javascript
console.log(Object.prototype.toString.call(arr)); // [object Array]
```

这也是过去常用于判断一个对象是不是数组的方式

3. 如果自己的构造函数希望改变toString，如何改变

```javascript
function Person() {}
Person.prototype.toString = function () {
  console.log("改变了toString..");
};

var p = new Person();
p.toString();
```

## 题目2

判断一个对象是不是真数组

- 此时就可以通过instanceof来判断
- 伪数组（类数组）没有Array原型上的内容，它的原型链上没有Array 的 prototype

instanceof 用于判断一个实例对象的原型链上是否存在该构造函数的原型

```javascript
var arr1 = [1, 2, 3, 4]; // 真数组
// 类数组(伪数组)
var arr2 = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};

// 判断arr1和arr2是否是真数组
console.log(arr1 instanceof Array); // true
console.log(arr2 instanceof Array); // false
```

## 题目3

```javascript
// 下面的代码输出什么？
function User() {}
User.prototype.sayHello = function () {};

var u1 = new User();
var u2 = new User();

console.log(u1.sayHello === u2.sayHello); // true
console.log(User.prototype === Function.prototype); // false
console.log(User.__proto__ === Function.prototype); // true
console.log(User.__proto__ === Function.__proto__); // true
console.log(u1.__proto__ === u2.__proto__); // true
console.log(u1.__proto__ === User.__proto__); // false
console.log(Function.__proto__ === Object.__proto__); // true
console.log(Function.prototype.__proto__ === Object.prototype.__proto__); //false
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

## 题目4

```javascript
// 下面的代码输出什么？（京东）
Function.prototype.a = 1;
Object.prototype.b = 2;

function A() {}

var a = new A();

console.log(a.a, a.b); // undefined 2
console.log(A.a, A.b); // 1 2
```

解析：

1. 实例对象a上面没有a属性与b属性，所以会去其原型链上去寻找。首先看**a.__proto__上有没有，**由于`a.__proto__ === A.prototype`, A.prototype上并没有，所以继续沿着原型链向上寻找，由于`A.prototype.__proto__ === Object.prototype`，而Object.prototype上没有a，有b，所以输出undefined 和 2
2. 构造函数A上没有a和b，所以会去其原型链上寻找。首先看A.__proto__上有没有，由于`A.__proto__ === Function.prototype`，Function.prototype上有a，所以输出1。Function.prototype上没有b但是由于`Function.prototype.__proto__ === Object.prototype`，所以输出2



# new

## new背后都做了什么

new 的背后做了什么？一共就是 4 步：

1. **创建一个空对象**
2. **让空对象的 __proto__ 属性指向构造函数的 prototype 属性**
3.  **让 this 指向该对象**
4. **如果该构造函数没有返回函数或者对象，那么则返回该对象**

```javascript
function Computer(name, price){
  this.name = name;
  this.price = price;
}
// JS中的函数就具有二象性
// 可以当成普通函数来调用
Computer();
// 也可以通过 new 的方式来调用
new Computer();
// 说白了，就看你有没有使用 new 关键字？

// 面试题：new 这么神奇，new 的背后做了什么？
// 一共就是 4 步：
// 1. 创建一个空对象
// 2. 让空对象的 __proto__ 属性指向构造函数的 prototype 属性
// 3. 让 this 指向该对象
// 4. 如果该构造函数没有返回函数或者对象，那么则返回该对象

function Computer(name, price){
  // 1. 创建一个空对象
  // var obj = {};
  
  // 2. 让空对象的 __proto__ 属性指向构造函数的 prototype 属性
  // obj.__proto__ = Computer.prototype
  
  // 让 this 指向该对象
  // this ---> obj
  
  this.name = name; // obj.name = name; {name}
  this.price = price; // obj.price = price; {name, price}
  
  // 4. 如果该构造函数没有返回函数或者对象，那么则返回该对象
  // return this;
}
var c = new Computer();
console.log(c.__proto__ === Computer.prototype); // true
```

## 实现new

```js
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
```

