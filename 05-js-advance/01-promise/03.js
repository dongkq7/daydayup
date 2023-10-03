new Promise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log(res); // 1
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    console.log(res); // 2
  });
