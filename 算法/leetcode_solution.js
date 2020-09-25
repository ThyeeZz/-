// 获取最大值
/**
 * 描述
 * @date 2020-07-08
 * @returns {any}
 */
function getMax() {
  let max = 0;

  let i = 0;
  while (i < 10) {
    let a = Math.floor(Math.random(0, 1) * 10);
    let b = Math.floor(Math.random(0, 1) * 10);
    console.log(a, b)
    max = Math.max(max, a - b);
    i++
  }
  console.log(max)
  return max
}


/**
 * 查找表问题：
 * 给定两个数组，编写一个函数来计算它们的交集。
示例 1:

输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
示例 2:

输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]

 * */

/**
 * solution: 为两个数组分别建立 map，用来存储 num -> count 的键值对，统计每个数字出现的数量。
然后对其中一个 map 进行遍历，查看这个数字在两个数组中分别出现的数量，
取出现的最小的那个数量（比如数组 1 中出现了 1 次，数组 2 中出现了 2 次，那么交集应该取 1 次），push 到结果数组中即可。

 * */

/**
 * 描述
 * @date 2020-07-08
 * @param {any} nums1
 * @param {any} nums2
 * @returns {any}
 */
function intersect(nums1, nums2) {
  function setMap(nums) {
    let map = new Map();
    nums.forEach(item => {
      let count = 1;
      if (map.get(item)) {
        count++
      }
      map.set(item, count)
    });
    return map
  }

  let res = [];

  let map1 = setMap(nums1);
  let map2 = setMap(nums2);

  for (let i of map1.keys()) {
    if (map2.get(i)) {
      res = [...res, ...new Array(map2.get(i)).fill(i)]
    }
  }
  console.log(res)
  return res
}
 intersect([1,2,2,1],[2,2,1]);


 var result = [...new Set([1,2,2,1])].filter(item=>[2,2,1].includes(item));
 console.log(result)


/**
 * 2、双指针问题
最接近的三数之和-16
给定一个包括  n 个整数的数组  nums  和 一个目标值  target。找出  nums  中的三个整数，使得它们的和与  target  最接近。返回这三个数的和。假定每组输入只存在唯一答案。
示例：

输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

*/
/**
 * solution: 先按照升序排序，然后分别从左往右依次选择一个基础点 i（0 <= i <= nums.length - 3），在基础点的右侧用双指针去不断的找最小的差值。
假设基础点是 i，初始化的时候，双指针分别是：

left：i + 1，基础点右边一位。
right: nums.length - 1 数组最后一位。

然后求此时的和，如果和大于 target，那么可以把右指针左移一位，去试试更小一点的值，反之则把左指针右移。
在这个过程中，不断更新全局的最小差值 min，和此时记录下来的和 res。
最后返回 res 即可。

*/
function threeSumClosest(nums, target) {

  console.log(123)
  function getSum(nums) {
    [].reduce.call(nums, (pre, cur) => {
      return pre += cur
    }, 0)
  }
  let n = nums.length;
  if (n === 3) {
    return getSum(nums)
  }

  nums.sort((x, y) => x - y)

  let min = Infinity;
  let res;

  // 从左往右一次尝试顶一个基础指针， 右边至少再保留两位，否则无法凑成3割
  for (let i = 0; i < nums.length - 3; i++) {
    let basic = nums[i];
    let right = n - 1;
    let left = i + 1;

    while (left < right) {
      let sum = basic + nums[left] + nums[right]; // 三数之和

      //更新最小差
      let diff = Math.abs(sum - target);
      if (diff < min) {
        min = diff;
        res = sum;
        
      }
      console.log(res)
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        // 相等得话差值为0 必是答案 
        return sum
      }
    }

  }
  console.log(res)
  return res

}

// threeSumClosest([-1, 2, 1, -4], 1)

/**
 * 3、滑动窗口问题
无重复字符的最长子串-3

给定一个字符串，请你找出其中不含有重复字符的   最长子串   的长度。

示例  1:

输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
*/

function longestSubStr(str){
  let left = 0,right = -1;
  let freqMap = {},max = 0;

  while(left < str.length){
    let nextLetter = str[right + 1]
    if(!freqMap[nextLetter] && nextLetter !== undefined){
      freqMap[nextLetter] = 1;
      right++
    }else{
      freqMap[str[left]] = 0;
      left ++;
      
    }
    console.log(freqMap)
    max = Math.max(max, right - left + 1)
  }
  console.log(max)
  return max
}

// longestSubStr('abcabcbb')

/**
 * 4、两两交换链表中的节点-24

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.
*/