var lengthOfLongestSubstring = function(s) {
  let maxLen = 0;
  let sArr = s.split('');

  function getLongestSubString(index){
    let tempArr = [];
    let subArr = sArr.slice(index)
    subArr.some(item=>{
      if(tempArr.includes(item)){
        return tempArr
      }else{
        tempArr.push(item)
      }
    })
    return tempArr
  }
  for(let i=0;i<sArr.length;i++){
    console.log(getLongestSubString(i))
    let len = getLongestSubString(i).length
    maxLen = len>maxLen?len:maxLen
  }
  return maxLen
};

// var findMedianSortedArrays = function(nums1, nums2) {
//   for(var j=0;j<nums1.length;j++){
//       if(nums2[0]<nums1[j]){
//           nums1.splice(j,0,nums2[0]); //将nums2 中的元素插入nums1；
//           nums2.shift(); //将刚插入元素删除；
//       }
//       if(nums2.length==0){
//           break; //当nums2中没有元素时跳出循环，以免浪费时间；
//       }
//   }
//   if(j==nums1.length){
//   nums1=nums1.concat(nums2);
//   } 
//   if(nums1.length%2==0){
//       return (nums1[parseInt((nums1.length-1)/2)]+nums1[parseInt((nums1.length-1)/2) +1])/2;
//   }
//   else{
//       return nums1[(nums1.length-1)/2];
//   }
// };

// var kidsWithCandies = function(candies, extraCandies) {
//   var time1 = new Date().getTime()
//   let result = [];
//   function isMax(list, target) {
//     let biggest = list.some(item=>{
//       return item > target
//     })
//     if(biggest){
//       return false
//     }else{
//       return true
//     }
//   }
//   candies.forEach(item => {
//     let res = isMax(candies, item + extraCandies);
//     result.push(res);
//   });
//   var time2 = new Date().getTime();
//   console.log(time2-time1);
//   return result;
// }


// 最长回文子串
// var longestPalindrome = function (s) {
//   let longest = '';

//   function isPalindrome(str) {
//     let str1 = str.split('').reverse().join('');
//     return Boolean(str === str1);
//   }
//   if (s.length === 1) {
//     return a
//   } else {
//     for (let i = 0; i < s.length; i++) {
//       for (let j = i + 1; j < s.length+1; j++) {
//         let res = isPalindrome(s.slice(i, j));
//         if (res && longest.length <= (j - i)) {
//           console.log(i,j)
//           longest = s.slice(i, j)
//         }
//       }
//     }
//   }
//   return longest
// };

// 1+。。。+n

// var sumNums = function (n) {
//   return n > 1 ? n + sumNums(n - 1) : 1
// };

// let arr = [
//   {
//     bp: 37,
//     hr: 120,
//     postion: 0,
//     alarmType: 1
//   },
//   {
//     bp: 32,
//     hr: 59,
//     postion: 1,
//     alarmType: 3
//   },
//   {
//     bp: 37,
//     hr: 120,
//     postion: 0,
//     alarmType: 2
//   },
//   {
//     bp: 33,
//     hr: 88,
//     postion: 1,
//     alarmType: 3
//   },
//   {
//     bp: 35,
//     hr: 99,
//     postion: 1,
//     alarmType: 1
//   },
//   {
//     bp: 36,
//     hr: 89,
//     postion: 1,
//     alarmType: 4
//   },
//   {
//     bp: 32,
//     hr: 59,
//     postion: 1,
//     alarmType: 2
//   },
//   {
//     bp: 36,
//     hr: 88,
//     postion: 1,
//     alarmType: 5
//   },

// ]
// function _sort(target){
//  target.sort((x,y)=>{
//     // if(x.postion == y.postion){
//     //   if(x.alarmType==y.alarmType){
//     //     return y.hr - x.hr
//     //   }else{
//     //     return x.alarmType - y.alarmType
//     //   }
//     // }else{
//     //   return y.postion - x.postion
//     // }
//     return y.postion - x.postion
//   })

// }


// let obj1 = {
//   age: 12
// }
// let obj2 = {
//   age: 14
// }

// Function.prototype.myBind = function(thisArg) {
//   if (typeof this !== 'function') {
//     return;
//   }
//   console.log(thisArg)
//   var _self = this;
//   var args = Array.prototype.slice.call(arguments, 1) //从第二个参数截取
//   return function() {
//     return _self.apply(thisArg, args.concat(Array.prototype.slice.call(arguments))); // 注意参数的处理
//   }
// }

// function log(){
//   console.log(this.age)
// }

// log.myBind(obj1).myBind(obj2)()




// 发布--订阅者模式

// class EventListen{
//   constructor(){
//     this.client = {}
//   }

//   $on(name,fn){
//     if(typeof fn !== 'function') throw new Error('类型错误');
//     const {client } = this;
//     if(name in client){
//       this.client[name].push(fn)
//     }else{
//       this.client[name] = [fn];
//     }
//   }
//   $emit(name,event){
//     const {client} = this;
//     const target = client[name]
//     if(target){
//       [].forEach.call(target,item=>{
//         item(event)
//       })
//     }
//   }
// }

// const eve = new EventListen();

// eve.$on('test',item=>{
//   console.log('监听到了111----'+item)
// })
// eve.$on('test',item=>{
//   console.log('监听到了222----'+item)
// })

// 给定两个数组，计算其交集
/**
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
示例 2:
 * 
*/

/**
 * 描述
 * @date 2020-07-08
 * @param {any} arr1=[]
 * @param {any} arr2=[]
 * @returns {any}
 */
// function getJiaoji(arr1 = [],arr2 = []){
//   let map1 = new Map();
//   let map2 = new Map();
//   arr1.forEach(item => {
//     let count = 1;
//     if(map1.get(item)){
//       count ++
//     }
//     map1.set(item,count)
//   });
//   arr2.forEach(item => {
//     let count = 1;
//     if(map2.get(item)){
//       count ++
//     }
//     map2.set(item,count)
//   });
//   let result = [];

//   for(let i of map1.keys()){
//     for(let j of map2.keys()){
//       if(i===j){
//         let res1 = map1.get(i);
//         let res2 = map2.get(j);
//         let res = res1>res2?res2:res1;
//         console.log(i,res)
//         result = [...result,...new Array(res).fill(i)]
//       }
//     }
//   }
//   console.log(result)
//   return result;
// }

// function getJiaoji(arr1 = [],arr2 = []){
//   let result = [];
//   arr2.forEach(item => {
//     if(arr1.includes(item)){
//       result.push(item);
//       arr1.find((subItem,index)=>{
//         if(subItem === item){
//           arr1.splice(index,1)
//         }
//       })
//     }
//   });
//   console.log(result)
// }
// getJiaoji([1,2,2,1],[2,2,1])

/**
 * 输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
*/

// function getMostCloseSum(arr=[],target){
//   let tempArr = arr.sort();

// }

// getMostCloseSum([-1,2,1,-4],1)

/**
 * 无重复字符的最长子串
 * 
 */

function longestSubstr(str = '') {
  // let tempArr = target.split('');
  // let result = [];
  // let res = [];

  // function getSubstr(n) {
  //   for (let i = n; i < tempArr.length; i++) {
  //     if (!res.includes(tempArr[i])) {
  //       res.push(tempArr[i])
  //     } else {
  //       console.log(res)
  //       result.push(res.length);
  //       console.log(result)
  //       res.length = [];
  //       break
  //     }
  //   }
  // }

  // for (let n = 0; n < tempArr.length; n++) {
  //   getSubstr(n)
  // }

  // let xx = result.sort().pop()
  // console.log(xx)


  let n = str.length;
  let left = 0;
  let right = -1;
  let freqMap = {};
  let max = 0;

  while (left < n) {
    // pwwkew
    let nextLetter = str[right + 1];

    if (!freqMap[nextLetter] && nextLetter !== undefined) {
      
      freqMap[nextLetter] = 1;
      right++
    } else {
      freqMap[str[left]] = 0;
      left++
    }
    console.log(freqMap,left,right+1)
    console.log(str[left],str[right + 1])
    max = Math.max(max, right - left + 1)
  }

  return max

}





