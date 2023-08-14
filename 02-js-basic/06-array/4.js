// 将下面的伪数组转换为真数组
const fakeArr = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

const arr = Array.prototype.slice.call(fakeArr);
