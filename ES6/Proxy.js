// 1、Proxy 的使用：

/**
 * 描述
 * @date 2020-07-14
 * @param {Object} target：代理的目标对象，即如果没有Proxy的介入，操作原来要访问的就是这个对象
 * @param {Object} handler：一个配置对象，提供一个对象的处理函数，该函数拦截对应的操作
 * @returns {any}
 */
// var proxy = new Proxy(target, handler);


/**
 * 下面是 Proxy 支持的拦截操作一览，一共 13 种。

1、get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。

2、set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

3、has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

4、deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

5、ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、
  Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，
  而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

6、getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，
返回属性的描述对象。

7、defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、
  Object.defineProperties(proxy, propDescs)，返回一个布尔值。

8、preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

9、getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。

10、isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

11、setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，
返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

12、apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，
比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

13、construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。*/

// 写一个 通过负数下标 正常获取到对应数组的值

let testArr = ['a', 'b', 'c', 'd', 'e', 'f'];

let proxy = new Proxy(testArr, {
  get(target, propKey) {
    console.log(target.length)
    propKey = Number(propKey) > 0 && Number(propKey) || Number(propKey) + target.length;
    console.log(propKey)
    return target[propKey]
  }
})

// let person = {name: '张三'}

// let proxy = new Proxy(person,{
//   get(target,propKey){
//     if(propKey in target){
//       return target[propKey]
//     }else{
//       throw new Error(`${target}中无${propKey}属性`)
//     }
//   }
// })

// a) GET
// 2、利用Proxy 实现属性的链式操作
var pipe = function (value) {

  var funcStack = [];

  let oproxy = new Proxy({}, {
    get(pipeObject, fnName) {
      console.log(fnName)
      if (fnName === 'get') {

        return funcStack.reduce((val, fn) => fn(val), value)
      }
      funcStack.push(window[fnName])
      return oproxy
    }
  })
  console.log(funcStack)
  return oproxy
}


// var double = n => n * 2;
// var pow = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;

// pipe(3).double.pow.reverseInt.get; // 63


// let proxy = new Proxy({}, {
//   get(target, propKey, receiver) {
//     return receiver
//   }
// })

// let target = Object.defineProperties({},{
//   'foo': {
//     value: 123,
//     writable: false,
//     configurable: false
//   },
//   'bar':{
//     value: 123,
//     writable: false,
//     configurable: false
//   }
// }

// )
// let handler = {
//   get(target, propKey) {
//     return 'abc'
//   }
// }

// let proxy2 = new Proxy(target, handler)
// proxy.foo

// b) SET
// 1、set方法用来拦截某个属性的赋值操作，四个参数
/**
 * 描述
 * @date 2020-07-14
 * @param {Object} target: 目标对象
 * @param {String} prop: 属性名
 * @param {any} value：属性值
 * @param {any} receiver：实力本身（可选）
 * @returns {any}
 */
// function set(target,prop,value,receiver){}

/**
 * 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
 * */


// let validator = {
//   set(target,prop,value){
//     if(prop==='age'){
//       if(!Number.isInteger(value)){
//         throw new Error('age should be a number')
//       }
//       if(value > 100){
//         throw new Error('The age seems invalid')
//       }
//       target[prop] = value
//     }
//   }
// }

// let person = new Proxy({},validator);


// 3、使用proxy 组织访问带‘_'的属性

const handler = {
  get(target, prop) {
    invariant(prop, 'get')
    return target[prop];
  },
  set(target, prop, value) {
    invariant(prop, 'set')
    target[prop] = value;
  }
}

function invariant(key, action) {
  console.log(key)
  if (key[0] === '_') {
    throw new Error(`无法${action}内部属性${key}`)
  }
}

let person = new Proxy({}, handler)



// Object.defineProperty vs proxy

const foo = {
  name: 'jjl',
  cars: ['benz', 'audi', 'bmw'],
  family: {
    son: 'liergou',
    grandSon: 'shadiaomi',
    daughter: {
      no1: 'saosao',
      no2: 'saosao2'
    }
  }
}

function deepWatch(foo) {
  const objStr = "[object Object]";
  const getObj = Object.prototype.toString;
  Object.keys(foo).forEach(prop => {
    let temp = foo[prop]
    console.log(getObj.call(temp))
    if (getObj.call(temp) === objStr) {
      console.log(temp)
      deepWatch(temp)
    } else {
      Object.defineProperty(foo, prop, {
        get() {
          console.log('访问' + prop + '属性')
          return temp
        },
        set(val) {
          console.log('设置' + prop + '属性为' + val)
          temp = val
        }
      })
    }

  })
}



// const proxy = new Proxy(foo, {
//   get: function (target, prop, receiver) {
//     console.log('访问' + prop + '属性')
//     return Reflect.get(target, prop, receiver);
//   },
//   set(target, prop, value, receiver) {
//     console.log('设置' + prop + '属性为' + value)
//     return Reflect.set(target, prop, value, receiver);
//   }
// })


let now = +new Date();
let delay = 3000

while (+new Date - now <delay) {

}
  

console.log('teste')