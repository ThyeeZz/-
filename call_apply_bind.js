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
function debounce(func, time) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null
    }
    timer = setTimeout(func, time * 1000)
  }
}

function log() {
  console.log(1233)
}

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
let bar = deepClone(foo)
console.log(bar)
bar.children.push('Alax')
console.log(bar, foo)