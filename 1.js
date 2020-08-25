/*
1、编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
*/
let test1_arr = ["flower", "flow", "flight"] //输出: "fl"
let test1_arr1 = ["dog", "racecar", "car"]

function getCommonStr(arr) {
  arr.sort((x, y) => x.length - y.length)
  let shortestStr = arr.slice(0, 1).shift();
  let strArr = [];
  let count = 0;

  return function getAnswer() {
    let str1 = shortestStr.substr(0, shortestStr.length - count);
    for (let item of test1_arr) {
      if (item.indexOf(str1) === -1) {
        count++
        getAnswer()

      }
      continue
    }
    strArr.push(str1)
    console.log(strArr)
    return strArr.pop()
  }
}
// getCommonStr(test1_arr1)()

// 2\给定一个字符串，逐个翻转字符串中的每个单词。

// let test2_str = "a good   example"

// function myReverse(str) {
//   let strArr = str.split(' ');
//   strArr = strArr.filter(item => {
//     return item != ''
//   })
//   console.log(strArr)
//   let finalStr = strArr.reverse().join(' ').trim();
//   return finalStr
// }
// let arr = []
// arr.push(myReverse(test2_str))
// console.log(arr)

// // 3
// var age = 10;
// var person = {
//   age: 20,
//   getAge() {
//     var age = 30;
//     return this.age;
//   },
// };
// alert(age, age * 2);  //10,20
// person.getAge();  // 20
// var b = person.getAge;
// b(); // 30
// (person.getAge)(); // 30
// (1, person.getAge)();
// (1, person.getAge.bind(person))();
// (person.getAge, person.getAge)();
// (person.getAge = person.getAge)();
// person.getAge.call(); // 30
// person.getAge.call(person); // 20

// function getAge2() {
//   this.age = 40;
//   console.log(person.getAge());
// };
// getAge2();
// console.log(age); // 30

// function getAge3() {
//   this.age = 50;
//   this.getAge4 = () => {
//     console.log(person.getAge.call(this)); // 50
//   }
// }
// new getAge3().getAge4();
// console.log(age);

// function getAge4() {
//   this.age = 60;
//   this.getAge5 = () => {
//     console.log(person.getAge.call(this));
//   }
// }
// new getAge4().getAge5();
// console.log(age);
// var age2 = 10;
// var person2 = {
//   age2: 20,
//   getAge2: () => {
//     var age2 = 30;
//     return this.age2;
//   },
// };
// console.log(person2.getAge2.call());
// console.log(person2.getAge2.call(person2));

// 3、const 一个对象，让其不可被改变

// 4、es5 实现 async await

// function b(){
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//       resolve(123)
//     }, 5000);
//   })
// }

// async function a (){
//   let res = await b();
//   console.log(res)
// }

function a() {
  setTimeout(() => {
    console.log(123)
    return 123
  }, 3000);
}

function b(callback) {
  let res = callback;
  console.log(res)
}

Function.prototype.myAsync = function (arg) {
  if (Object.prototype.toString.call(arg) === "[object Function]") {
    let status = 'rej';
    if (status === 'rej') {
      return arg()
      status = 'res'
    } else {

    }
  } else {
    return arg
  }

}
// b.myAsync(a)


// 5、es5 实现Promise 
function MyPromise(fn) {
  let self = this;
  this.value = null; // 存储resolve数据
  this.status = 'pending'; // 存储状态
  this.err = null; // 存储reject错误信息
  this.onFulfilledArr = []; // 存储将要执行的resolve函数
  this.onRejectedArr = []; // 存储将要执行的reject函数
  function resolveFn(val) { // resolve()时执行的函数
    if (self.status === 'pending') { // 只用pending状态才能继续进行
      self.value = val; // 存储数据
      self.status = 'fulfilled'; // 改变状态
      // 逐个调用then()函数
      self.onFulfilledArr.forEach(function (thenFn) {
        thenFn(self.value);
      });
    }
  }

  function rejectFn(errMsg) { // reject()时执行的函数
    if (self.status === 'pending') {
      self.err = errMsg;
      self.status = 'rejected';
      self.onRejectedArr.forEach(function (catchFn) {
        catchFn(self.err);
      });
    }
  }
  try {
    fn(resolveFn, rejectFn);
  } catch (e) {
    rejectFn(e);
  }

}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 如果当前处于pending状态，就将函数压入对应数组
  var self = this;
  if (self.status === 'pending') {
    self.onFulfilledArr.push(onFulfilled);
    self.onRejectedArr.push(onRejected);
  }
  // fulfilled状态就执行onFulfilled()方法
  if (self.status === 'fulfilled') {
    onFulfilled(self.value);
  }
  // onFulfilled状态就要执行onRejected()函数
  if (self.status === 'rejected') {
    onRejected(self.err);
  }
  return this; // return this是链式调用关键
};

let myFirstPromise = new MyPromise(function (resolve, reject) {
  //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
  //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
  setTimeout(function () {
    resolve("成功!"); //代码正常执行！
  }, 250);
});

myFirstPromise.then(function (successMessage) {
  //successMessage的值是上面调用resolve(...)方法传入的值.
  //successMessage参数不一定非要是字符串类型，这里只是举个例子
  console.log("Yay! " + successMessage);
});

// 6、reduce 去重
var arr = [2, 2, 3, 5, 3, 4, 6, 34, 7, 2, 1];
let reducer = arr => {
  return arr.reduce((result, next) => {
    if (!result.includes(next)) {
      result.push(next)
    }
    return result
  }, [])

}

var arr1 = [{
    a: 2
  },
  {
    a: 1,
    b: 3
  },
  {
    a: 2,
    x: 3
  },
  {
    a: 3
  },
  {
    a: 5
  }
]

let x = arr1.reduce((result, next, index) => {
  for (let p in next) {
    result += next[p]
  }
  return result
}, 0)


let arr2 = [
  [0, 1],
  [2, 3],
  [4, 5]
]
let y = arr2.reduce((res, cur) => {

  return [...res, ...cur]

}, [])

var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

let books = friends.reduce((prev, cur) => {
  return [...prev, ...cur.books]
}, [])

// Promise.then.catch.then 会执行吗
function promiseTest() {
  return new Promise((resolve) => {
    resolve()
  })
}


promiseTest().then().catch().then(() => {
  console.log(123)
})

// event loop
// console.log('script start') // 主栈 1       11111111
// async function async1() {
//   await async2();
//   console.log('async1 end')  // 微任务 2  7777777777
// }
// async function async2() {
//   console.log('async2 end'); //  主栈 2    2222222
//   setTimeout(function () {           // 红任务1   1001001010
//     console.log('setTimeout1');
//   }, 0)
//   return new Promise(resolve => {
//     console.log('promise3')        // 主栈 3   3333333
//     resolve()
//   }).then(function () {
//     console.log('promise4')   // 微任务 1    66666666
//   })
// }
// async1()
// setTimeout(function () {     
//   console.log('setTimeout')    // 宏任务 2   11111
// }, 0)
// new Promise(resolve => {
//   console.log('promise')    // 主栈 4    4444444
//   resolve()
// }).then(function () {
//   console.log('promise1')    // 微任务 3  888888
// }).then(function () {
//   console.log('promise2')  // 微任务 4  99999999
// })
// console.log('script end')  // 主栈 5    55555


// 实现bind

// var  bindObj1 = {
//   a1: 1
// }
// var  bindObj2 = {
//   a1: 2
// }

// function log(){
//   console.log(this.a1) 
// }

// Function.prototype.myBind = function(arg){
//   let fn = this // this指向调用mybind的 log函数
//   let that = arguments[0]
//   console.log(fn,arg)
//   let args = []
//   for(let i=1;i<arguments.length;i++){
//     args.push(arguments[i])
//   }
//   let result = function(){
//     console.log(that)
//     fn.apply(that,[...args])
//   }
//   console.log(result)
//   return result
// }

// log.myBind(bindObj1)() // 1
// log.myBind(bindObj2)() // 2


// 实现一个乱序算法

let arr11 = [1, 2, 3, 4, 5];

// ----------  1  ------------
// function outOrder(arr) {
//   let len = arr.length;
//   let arr2 = [];
//   while (arr2.length < len) {
//     let index = Math.floor(Math.random(0, 1) * len)
//     if (!arr2.includes(index)) {
//       arr2.push(index);
//     }
//   }
//   console.log(arr2)
//   let arr12 = [];
//   for (let i of arr2) {
//     arr12.push(arr11[i])
//   }
//   return arr12
// }

// ------ 2  -------------
// function outOrder(arr){
//   return arr.sort(()=>{
//     return Math.random()-0.5
//   })
// }
// console.log(outOrder(arr11))

// 实现一个深拷贝
let obj = {
  a: 1,
  b: {
    name: 'xx',
    age: 12
  },
  c: [12, 4, [56, 76]],
  d: false,
  e: null
}
Object.prototype.gender = 'male';

// function deepClone(origin, target = {}) {
//   var getType = Object.prototype.toString;
//   let objStr = "[object Object]",
//     arrStr = "[object Array]";

//   for (let p in origin) {
//     if (origin.hasOwnProperty(p)) {
//       if (getType.call(origin[p]) === objStr || getType.call(origin[p]) === arrStr) {
//         let subTarget = getType.call(origin[p]) === objStr ? {} : []
//         console.log(origin[p], subTarget)
//         deepClone(origin[p], subTarget)
//       }
//       target[p] = origin[p]
//     }
//   }
//   return target
// }
const deepClone = (origin, target) => {
  var target = target || {}, //设置target的默认值，不传值默认为空对象
    toStr = Object.prototype.toString, //原型链方法：判断数值类型
    arrStr = '[object Array]';

  for (var prop in origin) {
    if (origin.hasOwnProperty(prop)) { //判断对象下面是否有属性，没有属性的即为原始值

      if (origin[prop] !== 'null' && typeof (origin[prop]) === 'object') { //判断需要被克隆的对象的属性是否为原始值
        target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {}; //不是原始值，将其转为数组或对象
        deepClone(origin[prop], target[prop]); //如果不是原始值，继续调用自身，判断该属性的子属性是否为原始值
      } else {
        target[prop] = origin[prop]; //如果是原始值的话，将其复制给克隆对象
      }
    }
  }
  return target
}



let obj1 = deepClone(obj)
console.log(obj1 === obj)

obj.c.push(12)
console.log(obj1, obj)
// prototypr 和 __proto__
// function fn(){
//   console.log(123)
// }
// console.log(fn.prototype.constructor)
// console.log(fn.__proto__ === Function.prototype)


// function Person(name){
//   this.name = name
// }

// console.log(Function.prototype)
// console.log(Person.prototype)



// ------作用域