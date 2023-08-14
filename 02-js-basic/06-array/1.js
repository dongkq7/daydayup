// 删除数组中的所有字符串
const nums = [1, 1, "1", "a", "b", "a", 3, 5, 3, 7];

for (let i = 0; i < nums.length; i++) {
  const item = nums[i];
  if (typeof item === "string") {
    nums.splice(i, 1);
    i--;
  }
}

console.log("nums", nums);
