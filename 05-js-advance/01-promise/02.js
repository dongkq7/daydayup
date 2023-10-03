const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const pro2 = pro1.then((data) => {
  console.log(data);
  return data + 1;
});

const pro3 = pro2.then((data) => {
  console.log(data);
});

console.log(pro1, pro2, pro3); //  都是 pending 状态

setTimeout(() => {
  console.log(pro1, pro2, pro3); // pro1: fulfilled result 1、pro2: fulfilled result 2、pro3: fulfilled result undefined
}, 2000);