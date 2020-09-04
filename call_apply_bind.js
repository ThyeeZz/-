// 手写 call apply bind
Function.prototype.myCall = function (context, ...rest) {
  console.log(this)
  // 因为传进来的 context 有可能是 null
  context = context || window
  // Function.prototype this 为当前运行的函数
  // 让 fn 的上下文为 context
  context.fn = this

  const result = context.fn(...rest)

  delete context.fn

  return result

}
// apply
Function.prototype.myApply = function (context, rest) {
  context = context || window
  // Function.prototype this 为当前运行的函数
  // 让 fn 的上下文为 context
  context.fn = this

  const result = context.fn(...rest)

  delete context.fn

  return result
}

// bind
Function.prototype._bind = function (context) {
  context = context || window;

  const fn = this;

  return function (...rest) {
    fn.call(context, ...rest)
  }

}

function text(a, b, c) {
  console.log(this, a, b, c)
  return this
}
text.myCall({
  test: 22
}, 1, 2, 3)
text.myApply({
  test: 22
}, [1, 2, 3])

text._bind({
  test: 22
})(1, 2, 3)

// 原型

// prototype: 原型对象；
// __proto__: 对象原型，
// constructor: 构造函数

function Person() {
  this.name = 'xy';
  this.age = 13;
}
Person.prototype.sing = function () {
  console.log(this.name + 'sing')
}

function Chinese() {
  this.color = 'yellow';
}
Person.prototype = Chinese.prototype;

const mingo = new Person()
// console.log(mingo instanceof Chinese) // ???
// console.log(Person.prototype.__proto__===Object.prototype)


// console.log(mingo.__proto__===Person.prototype)
// console.log(Person.prototype.constructor===Chinese)
// console.log(Person.prototype.__proto__===Object.prototype)
// console.log(Person.__proto__===Object.prototype)
// console.log(Object.prototype.constructor.__proto__===null)
// console.log()

// 手写 new
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sing = function () {
    console.log(this.name + 'sing')
  }
}

function _new(constructor, ...args) {
  let instance = {}; // 创建空对象
  constructor.call(instance, ...args); // 将this指向该对象，并执行构造函数
  return instance //返回该对象
}
// const person = new Person('小王',13)
const person = _new(Person, '小王', 13)
console.log(person)
person.sing()

// 防抖节流
// function debounce(func, time) {
//   let timer = null;
//   return function () {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null
//     }
//     timer = setTimeout(func, time * 1000)
//   }
// }

// function log() {
//   console.log(1233)
// }

// const test1 = debounce(log,0.5)

// 函数节流，每隔ns 执行一次的操作
function throttle(fn, delay) {
  let timer = null;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(_this, args);
      timer = null;
    }, delay * 1000)
  }
}

// const test2= throttle(log,0.5)

/*
  sleep 函数
*/
function sleep(delay) {
  let now = +new Date();
  console.log(now + delay)
  let x = +new Date

  while (x < now + delay) {
    x = +new Date

  }
  console.log('睡眠结束')
}


function fn(a) {
  console.log(a)
  var a = 1;
  console.log(a)

  function a() {}
  console.log(a)

  var b = function () {}
  console.log(b)
}
fn(1)

function timeFormat(str, time) {
  // YY-MM-DD hh:mm:ss
  time = time || +new Date();
  dateTime = time < 10000000000 ? new Date(time * 1000) : new Date(time)
  const YYYY = dateTime.getFullYear();
  const YY = YYYY.toString().substring(2);

  const MM = dateTime.getMonth() < 9 ? `0${dateTime.getMonth()+ 1}` : `${dateTime.getMonth()+1}`;
  const M = dateTime.getMonth();

  const DD = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : `${dateTime.getDate()}`;
  const D = dateTime.getDate();

  const hh = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : `${dateTime.getHours()}`;
  const h = dateTime.getHours();

  const mm = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : `${dateTime.getMinutes()}`;
  const m = dateTime.getMinutes();

  const ss = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}` : `${dateTime.getSeconds()}`;
  const s = dateTime.getSeconds();

  const o = {}
  for (let i of str) {
    if (!o[i]) {
      o[i] = 1
    } else {
      o[i] += 1
    }
  }

  let year = o.Y === undefined ? '' : o.Y === 2 ? `${YY}-` : `${YYYY}-`;
  let mounth = o.M === undefined ? '' : o.M === 2 ? `${MM}-` : `${M}-`
  let day = o.D === undefined ? '' : o.D === 2 ? `${DD} ` : `${D} `
  let hour = o.h === undefined ? '' : o.h === 2 ? `${hh}:` : `${h}:`
  let minute = o.m === undefined ? '' : o.m === 2 ? `${mm}:` : `${m}:`
  let second = o.s === undefined ? '' : o.s === 2 ? ss : s

  console.log(`${year}${mounth}${day}${hour}${minute}${second}`)
  return `${year}${mounth}${day}${hour}${minute}${second}`

}

// 单例
function singleton(func) {
  const _this = this;
  let instance
  return function () {
    return instance || (instance = func.call(_this, arguments))
  }
}

var createMask = singleton(

  function (x, y) {
    return document.body.appendChild(document.createElement('div'));
  }

)
// 手动实现 map filter reduce
Array.prototype._map = function (callBack) {
  let res = [];
  const target = this; // this 指向调用——map的数组；
  target.forEach(item => {
    let temp = callBack(item)
    res.push(temp)
  })
  return res
}
Array.prototype._filter = function (callBack) {
  let res = [];
  const target = this; // this 指向调用——map的数组；
  target.forEach(item => {
    let temp = callBack(item)
    temp && (res.push(item))
  })
  return res
}

Array.prototype._reduce = function (callBack, origin) {
  origin = origin || 0;
  const target = this; // this 指向调用——map的数组；
  target.forEach(item => {
    origin = callBack(origin, item)
  })
  return origin
}

const arr = [1, 2, 2, 3, 4, 4, 5]

let res = arr._reduce((pre, cur) => {
  if (!pre.includes(cur)) {
    pre.push(cur)
    return pre
  } else {
    return pre
  }
}, [])

console.log(res)

const foo = {
  name: 'Tony',
  age: 56,
  children: ['Jack', 'Mike', 'Anna'],
  skill: {
    code: 'tony can be a good programer',
    dink: 'tony kikes drinking'
  }
}
// 手写身前拷贝
// 浅拷贝：遍历、结构
function shallowClone(target) {
  let result = null;
  if (target instanceof Array) {
    result = []
  } else {
    result = {}
  }

  const objStr = "[object Object]";
  const getType = function (origin) {
    return Object.portotype.toString.call(origin)
  }

  Object.keys(target).forEach(prop => {
    if (target[prop] !== null && typeof target[prop] === 'object') {
      let type = getType(target[prop]);
      result[prop] = type === objStr ? {
        ...target[prop]
      } : [...target[prop]]
    } else {
      result[prop] = target[prop]
    }
  })
  return result
}
// let bar = shallowClone(foo)
// console.log(bar)
// foo.children.push('Alax')
// console.log(bar, foo)

// 深拷贝 遍历
function deepClone(origin, result) {
  result = result || {};

  const objStr = "[object Object]";
  const getStr = Object.prototype.toString;

  Object.keys(origin).forEach(prop => {
    if (origin.hasOwnProperty(prop)) {

      if (origin[prop] !== 'null' && typeof (origin[prop]) === 'object') {
        result[prop] = getStr.call(origin[prop]) === objStr ? {} : [];
        deepClone(origin[prop], result[prop])
      } else {
        result[prop] = origin[prop];
      }
    }
  })
  return result
}
// let bar = deepClone(foo)
// console.log(bar)
// bar.children.push('Alax')
// console.log(bar, foo)

// 手写promise

function _Promise(func) {
  this.status = undefined;
  this.result = null;
  this.func = func;

  this.then = function (fn) {
    fn.call(window, this.result)
  };
  this.catch = function (fn) {
    fn.call(window, this.result)
  }
}

let p = new _Promise((resolve, reject) => {
  let flag = true
  setTimeout(() => {
    if (flag) {
      resolve(flag)
    } else {
      reject('flag 为false')
    }
  }, 2000);
})






function getData(flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) {
        resolve(flag)
      } else {
        reject('flag 为false')
      }
    }, 2000);
  }).then(res => {
    console.log('返回值为' + res)
  }).catch(err => {
    console.log(err)
  })
}

// 手写 forEach 代码
Array.prototype._forEach = function (callBack, thisArg) {
  thisArg = thisArg || this;
  if (typeof callBack !== 'function') {
    throw new Error(callBack + 'is not a function')
  }

  const target = Object(this)
  const len = target.length;

  let index = 0;

  while (index < len) {
    let val = target[index];
    callBack.call(thisArg, val, index, target)
    index++
  }
}

// 发布订阅者模式
function handleOne(a, b, c) {
  console.log('第一个监听函数', a, b, c)
}

function handleSecond(a, b, c) {
  console.log('第二个监听函数', a, b, c)
}

function handleThird(a, b, c) {
  console.log('第三个监听函数', a, b, c)
}

class EventEmitter {
  constructor() {
    this.eventList = {}
    /*
      {
        eventName: [fn1,fn2,...]
      }
    */
  }
  on(eventName, fn) {
    this.eventList[eventName] = new Set([...this.eventList[eventName] || [], fn])
    return this
  }

  emit(eventName, ...args) {
    console.log(this.eventList)
    const events = this.eventList[eventName];
    if (!events.size) {
      throw new Error('没有处理函数')
    } else {
      events.forEach(event => event.call(this, ...args))
    }
  }

  offOne(eventName, fn) {
    const events = this.eventList[eventName];
    if (events) {
      const bool = events.delete(fn);
      return (bool && '删除成功' || '删除失败，未找到此处理函数')
    }
  }

  offAll(eventName) {
    if (eventName) {
      const events = this.eventList[eventName];
      events.clear();
    } else {
      this.eventList = {};
    }
  }
}

const emitter = new EventEmitter();

// event loop

// async function async1() {
//   console.log('async1 start');  // 宏任务2
//   await async2();              
//   console.log('async1 end');  // ？？
// }
// async function async2() {
//   console.log('async2');  //宏任务3
// }
// console.log('script start');// 宏任务1
// setTimeout(function () {
//   console.log('setTimeout');  // 微任务 最高层
// }, 0);
// async1();
// new Promise(function (resolve) {
//   console.log('promise1');   // 宏任务 4
//   resolve();
// }).then(function () {
//   console.log('promise2');  // 微任务1 
// });
// process.nextTick(() => {
//   console.log('nextTick');  //微任务 最底层
// })
// console.log('script end'); // 宏任务 5



setTimeout(()=>{
  console.log('A');  // 微任务对高层
},0);
var obj={
  func:function () {
      setTimeout(function () {
          console.log('B') // 微任务对高层 -1
      },0);
      return new Promise(function (resolve) {
          console.log('C');  // 宏任务1
          resolve();
      })
  }
};
obj.func()  // 
.then(function () {
  console.log('D')  //微任务 1
});
console.log('E');  //宏任务2

// C->E ->D ->A ->B
