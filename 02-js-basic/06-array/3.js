// 判断下面的文件是否符合后缀名要求
// 合法的后缀名：.jpg  .gif  .bmp .webp  .png

const filename = "d://files/mymap/3.jpg";
const index = filename.lastIndexOf(".");
const suffix = filename.substring(index);

const legalSuffix = [".jpg", ".gif", ".bmp", ".webp", ".png"];
if (legalSuffix.includes(suffix)) {
  console.log("合法后缀");
} else {
  console.log("非法后缀");
}
