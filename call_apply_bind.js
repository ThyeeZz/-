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
function sleep(delay){
  let now = +new Date();
  console.log(now + delay)
  let x = +new Date

  while( x < now + delay){
    x = +new Date
    
  }
  console.log('睡眠结束')
}


function fn(a){
  console.log(a)
  var a = 1;
  console.log(a)
  function a(){}
  console.log(a)

  var b = function(){}
  console.log(b)
}
fn(1)