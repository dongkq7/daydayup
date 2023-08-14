/**
 * 将日期格式化为字符串
 * @param {Date} date 要格式化的日期对象
 * @param {string} format 格式化字符串 yyyy-年  MM-月  dd-日 HH-小时 mm-分钟 ss-秒 ms-毫秒
 * @return {string} 日期字符串
 */
function formatDate(date, format) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds();

  return format
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("ms", milliseconds);
}

var d = new Date();
console.log(formatDate(d, "yyyy年MM月dd日 HH时mm分ss秒"));
