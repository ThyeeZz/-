const foo = [1, 9, 7, 16, 9, 8, 33, 5, 1, 2, 6]

// 1、冒泡牌排序
function bubbleSort(arr, reverse = true) {

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {

      if (reverse) {
        if (arr[i] < arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]]
        }
      } else {
        if (arr[i] > arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]]
        }

      }
    }
  }
  return arr
}
// console.log(bubbleSort(foo, false));

function quickSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr
  const middleIndex = Math.floor(len / 2);
  const middleItem = arr.splice(middleIndex, 1)[0];
  const left = [],
    right = [];

  arr.forEach(item => {
    if (item < middleItem) {
      left.push(item)
    } else {
      right.push(item)
    }
  })

  return [...quickSort(left),middleItem,...quickSort(right)]
}

console.log(quickSort(foo))