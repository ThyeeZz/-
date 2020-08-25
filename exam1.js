/*
1、如下为一段代码，请完善sum函数，使得 sum(1,2,3,4,5,6) 函数返回值为 21 ,
需要在 sum 函数中调用 asyncAdd 函数进行数值运算，且不能修改asyncAdd函数
*/
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b)
  }, 1000)
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  let promises = [];
  let result = 0;
  rest.forEach(item => {

    promises.push(new Promise((resolve) => {
      asyncAdd(result, item, (_, res) => {
        resolve(res)
      })
    }).then(res => {
      result += res
    }))
  })

  await Promise.all(promises)
  return result

}

let start = window.performance.now()
// sum(1, 2, 3, 4, 5, 6).then(res => {
//   // 请保证在调用sum方法之后，返回结果21
//   console.log(res)
//   console.log(`程序执行共耗时: ${window.performance.now() - start}`)
// })

/*
2、请说明以下代码各输出了什么?
*/
console.log(typeof (() => {})) //undefined

console.log(typeof ['前端有的玩', '公众号']) // Object

console.log(typeof null) // null

console.log(typeof undefined) //undefined

console.log(typeof Function.prototype) // Object

console.log('子君'
  instanceof String) // Boolean

console.log(new Date() instanceof Date) // Boolean

/*
3、实现 new 操作符
*/
function myNew(constructor, ...rest) {
  if (typeof constructor !== 'function') {
    return constructor;
  }
  //创建新的对象,关联构造函数的原型对象
  console.log(constructor.prototype)
  const _constructor = Object.create(constructor.prototype);
  console.log(_constructor)
  //执行构造函数
  const obj = constructor.apply(_constructor, rest);
  console.log(obj)
  //如果构造函数执行结果是对象则返回执行结果
  if (typeof obj === 'object') {
    return obj;
  } else {
    return _constructor;
  }
}

function Fun(name, sex) {
  this.name = name
  this.sex = sex
}
Fun.prototype.getUserInfo = function () {
  return `我的姓名${this.name},我的性别${this.sex}`
}

const fun = myNew(Fun, '子君', '男')
// 我的姓名子君，我的性别男
console.log(fun.getUserInfo())

/*
5、请说出以下代码输出内容
*/
const a = {};
const b = Symbol('1');
const c = Symbol('1');
a[b] = 'xx';
a[c] = 'yy';
console.log(a[b])

const d = {}
const e = {
  key: '1'
}
const f = {
  key: '2'
}
d[e] = '子君'
d[f] = '君子'

// 我是子君还是君子呢
console.log(d[e])

console.log([] + [])
console.log({} + [])
console.log([] == ![])
console.log(true + false)



