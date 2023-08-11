// 下面的代码输出什么

var a = 1,
  b = 2;

function m1() {
  console.log(a); // undefined
  var a = 3;
  function m2() {
    console.log(a, b); // 3 2
  }
  m2();
}

m1();
