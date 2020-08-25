// 1、css实现动画，怎么让它执行完这个去执行另外一个keyFrame，你怎么知道这个动画什么时候结束


// 2、 实现隔一段时间输出name
// function A(name) {
//   this.name = name;
// }
// A.prototype.log = function () {
//   //每隔2s输出一下name
//   setInterval(() => {
//     console.log(this.name)
//   }, 2000)

// }

// let a1 = new A('xx')

// // 3、为啥下面这个代码会爆栈？用setTimeout来递归实现setTimeInterve()就不会爆栈
// function fo() {
//   console.log('在递归呢')
//   setTimeout(() => {
//     fo()
//   }, 1000)
// }


// let src = 'hello world',
//   target = 'world';

// let found = src.match(target)
// // ------------
// function foo() {
//   var b = 2;
//   // 1
//   console.log(b + this.a)
// }

// function foo1() {
//   var a = 4
//   // 2
//   console.log(a + this.a)
//   foo.call(this)
// }
// foo1.call({
//   a: 122
// })

// //  ----------------
// var arr = [1, 3, 4, 2, 6, 7, 9];

// arr.mySort();
// Array.prototype.mySort = function(){
//   return this.sort((x,y)=>x-y)
// }

// 求最长不重复字串，如1231456 => 231456

// let str = '12314556';
// let strArr = str.split('');
// let result = []

// function longestString(arr) {
//   let tempArr = []
//   if (arr.length === 1) {
//     return tempArr.push(arr[0])
//   }

//   // 求不重复的长度
//   for (let i of arr) {
//     if (!tempArr.includes(i)) {
//       tempArr.push(i);
//     } else {
//       console.log('发现重复');
//       result.push(tempArr);
//       longestString(arr.slice(1, arr.length));
//       return

//     }
//   }
//   result.push(tempArr);
// }
// let res = [];
// longestString(str)
// for(let i of result){
  
//   if(i.length>res.length){
//     res = [...i]
//   }
// }
// console.log(res)

// 手写 call apply bind


function foo(age,height) {
  console.log(this.name) // obj
  console.log(age)       // 3
  console.log(height)    // null
}
const obj = {
  name: 'obj',
  age: 3
}

// call：

// Function.prototype.changgeDirection = function(arg){
//   arguments[0].fn = this; // this指向 foo 函数体
//   let argArr = [];
//   argArr = Array.from(arguments).slice(1)
//   console.log([...argArr])
//   let result = arguments[0].fn(...argArr)
//   delete arguments[0].fn;
//   return result
// }
// foo.changgeDirection(obj,obj.age,obj.height);

// apply:
// Function.prototype.changgeDirection = function(arg){
//   arguments[0].fn = this;
//   let argArr = arguments[1]?arguments[1]:[];


//   let result = arguments[0].fn(...argArr)
//   delete arguments[0].fn;
//   return result

// }
// foo.changgeDirection(obj,[obj.age,obj.height]);

// bind
// Function.prototype.changgeDirection = function(arg){
//   let that = arguments[0]
//   let fn = this;
//   let argArr = Array.from(arguments).slice(1);
  
//   let result = function(n){
//     argArr = [...argArr,...arguments]
//     fn.call(that,...argArr)
//   }
//   return result

// }
// foo.changgeDirection(obj)(2,32);


// 阻塞线程

// function zuse(delay){
//   let start = new Date().getTime()
//   while((new Date().getTime() - start) <delay){
//     continue
//   }
// }
// zuse(3000)
// console.log(11111)

// 算法，一个树结构，有id和一个子节点数组，要求在所有子节点上增加一个属性为父节点的parentId
// let dataArr = [
//   {
//     id:'1',
//     children:[
//       {
//         id:'1-1',
//         children: [
//           {
//             id:'1-1-1',
//             children: null
//           },
//           {
//             id:'1-1-2',
//             children: null
//           }
//         ]
//       },
//       {
//         id:'1-2',
//         children: [
//           {
//             id:'1-2-1',
//             children: null
//           },
//           {
//             id:'1-2-2',
//             children: null
//           }
//         ]
//       }
//     ]
//   }
// ]

// function setParentId(arr){
//   for(let i of arr){
//     if(i.children!== null){
//       for(let j of i.children){
//         j.parentId = i.id
//       }
//       setParentId(i.children)
//     }
    
//   }
// }
// setParentId(dataArr)

// 不用全局变量 实现
// let a = new Foo() //a.id -> 1
// let b = new Foo() //b.id -> 2

// const Foo = (function(){
//   let index =1;
//   return function(){
//     this.id = index ++
//   }
// })()


// let a = new Foo();
// let b = new Foo();


// 数据劫持
var o = {};
Object.defineProperty(o, 'a', {
  get() { return 1; },
  configurable: false
});




