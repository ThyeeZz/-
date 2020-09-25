// 1 数组扁平化
const flat_arr = [1, [2, 3], 4, [5, [6, 7], 8],
  [9]
]
// flat 递归 正则 reduce
const _flat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(cur instanceof Array && _flat(cur) || cur)
  }, [])
}
// console.log(_flat(flat_arr))


// 2 数组去重
const arr1 = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
//new Set()  双层for循环 对象 reduce

// for (let i = 0; i < arr1.length; i++) {
//   for (let j = i + 1; j < arr1.length; j++) {
//     if (arr1[i] === arr1[j]) {
//       arr1.splice(j, 1);
//       j--
//     }
//   }
// }

const _unique = arr => {
  return arr.reduce((pre, cur) => {
    !pre.includes(cur) && pre.push(cur);
    return pre
  }, [])
}


// 3 类数组转数组
// Array.form  [...] Array.prototype.slice.call() concat


// 4 Array.prototype.filter API
Array.prototype._filter = function (callback, thisArg) {
  thisArg = thisArg || window;
  const caller = this;
  if (typeof callback !== 'function') {
    throw new Error('callback is not a function!');
  }
  if (!caller instanceof Array) {
    throw new Error('caller is not a Array!');
  }

  let index = 0;
  let len = caller.length;

  const res = [];
  while (index < len) {
    let value = caller[index];

    if (callback.call(thisArg, value, index, caller)) {
      res.push(value);
    }
    index++;
  }
  return res
}


// 5 Array.prototype.reduce API
Array.prototype._reduce = function (callback, initVal) {

  if (!this instanceof Array) {
    throw new Error('caller is not Array')
  }
  const caller = Object(this);
  initVal = initVal || caller[0];

  let index = 0;
  const len = caller.length;
  while (index < len) {
    const value = caller[index];
    initVal = callback.call(undefined, initVal, value, index, caller)

    index++
  }
  return initVal
}


// 5 call apply bind
Function.prototype._call = function (context, ...args) {
  context = context || window;

  context.fn = this;
  const res = context.fn(...args)
  delete context.fn;
  return res
}

Function.prototype._apply = function (context, [...args]) {
  console.log(this)
  context = context || window;

  context.fn = this;
  console.log(context.fn)
  const res = context.fn(...args)
  delete context.fn;
  return res
}

Function.prototype._bind = function (context) {
  context = context || window;
  const fn = this;

  const res = function (...args) {
    return fn.call(context, ...args)
  }
  return res
}

const obj1 = {
  name: 'obj1'
}
const obj2 = {
  name: 'obj2'
}

function log(a, b, c) {
  console.log(this.name, a, b, c)
}



// 观察者模式
class EventEmitter {
  constructor() {
    this.depence = {};
  }

  on(name, fn) {
    if (!this.depence[name]) {
      this.depence[name] = []
    }
    this.depence[name].push(fn);
  }
  emit(name,...args) {
    const tempArr = this.depence[name];
    console.log(tempArr)
    if (tempArr && tempArr.length) {
      tempArr.forEach(fn => fn(...args))
    }
  }
  offOne(name) {
    if (this.depence[name]) {
      this.depence[name].length = 0
    }
  }
  offAll() {
    this.depence = {};
  }
}

const watcher = new EventEmitter();
watcher.on('say', (...arg) => {
  console.log(...arg)
})
watcher.emit('say',1,2,3)

// bind
Function.prototype.myBind = function (context = globalThis) {
  console.log(context)
  const fn = this
  const args = Array.from(arguments).slice(1)
  const newFunc = function () {
    const newArgs = args.concat(...arguments)
    // if (this instanceof newFunc) {
    //   // 通过 new 调用，绑定 this 为实例对象
    //   fn.apply(this, newArgs)
    // } else {
    //   // 通过普通函数形式调用，绑定 context
    //   fn.apply(context, newArgs)
    // }

    fn.apply(context, newArgs)
  }
  // 支持 new 调用方式
  newFunc.prototype = Object.create(fn.prototype)
  
  return newFunc
}
const obj3 = {
  name: 'obj3'
}
log.myBind(obj1).myBind(obj2).myBind(obj3)(1,2,3)