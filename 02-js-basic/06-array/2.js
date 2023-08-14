// 数组去重
const nums = [1, 1, "1", "a", "b", "a", 3, 5, 3, 7];

for (let i = 0; i < nums.length; i++) {
  const item = nums[i];
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[j] === item) {
      nums.splice(j, 1);
      j--;
    }
  }
}

console.log("nums", nums);
