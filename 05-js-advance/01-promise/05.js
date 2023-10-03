new Promise((resolve, reject) => {
  resolve(1)
})
  .then((res) => {
    console.log(res); // 1
    return new Error('2');
  })
  .catch((err) => {
    throw err;
    return 3;
  })
  .then((res) => {
    console.log(res); // Error('2)
  });
