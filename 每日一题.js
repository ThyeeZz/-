const obj = {
  1: 200,
  2: 140,
  5: 400
};

function translate(obj) {
  // 请在此处添加代码
  const list = new Array(12).fill(null);

  Object.keys(obj).forEach(mounth => {
    list[mounth - 1] = obj[mounth]
  })
  return list

}
// 输出 [200, 140, null, null, 400, null, null, null, null, null, null, null]
console.log(translate(obj));

// 2、输出1-400 间含1 数字个数
function getCount() {
  let count = 0;
  let begin = 1;
  while (begin < 400) {
    count += `${begin}`.split('1').length - 1;
    begin++;
  }
  return count
}
console.log(getCount());

// 3、1-10000 之间的回文数组，0-9 不计
function getHuiwen() {
  let begin = 10;
  let count = 0;
  while (begin < 10000) {
    const tempArr = `${begin}`.split('');
    const len = tempArr.length;
    const left = len % 2 === 0 && tempArr.slice(0, len / 2) || tempArr.slice(len / 2)
    const right = len % 2 !== 0 && tempArr.slice(0, (len - 1) / 2) || tempArr.slice((len + 1) / 2);
    if (left.reverse().join('') === right.join('')) {
      count++
    }
    begin++
  }
  return count
}
console.log(getHuiwen())