// 1.不借助变量，交换两个数
let x = 11,
    y = 22;
[x, y] = [y, x]

// 2.实现sum(1,2,3)==sum(1)(2)(3)
function sum(n) {
    return function (n1) {
        return function (n2) {
            return n + n1 + n2
        }
    }
}

// 3.观察者模式 vs 发布-订阅模式，说说区别
/*
    观察者模式模式，属于行为型模式的一种，它定义了一种一对多的依赖关系，
    让多个观察者对象同时监听某一个主题对象。这个主体对象在状态变化时，
    会通知所有的观察者对象，使他们能够自动更新自己。
*/

/*
    发布-订阅模式，消息的发送方，叫做发布者（publishers），消息不会直接发送给特定的接收者,叫做订阅者。
    意思就是发布者和订阅者不知道对方的存在。需要一个第三方组件，叫做信息中介，它将订阅者和发布者串联起来，它过滤和分配所有输入的消息。
    换句话说，发布-订阅模式用来处理不同系统组件的信息交流，即使这些组件不知道对方的存在。
    --->用于组建解耦

*/

// 6.求代码输出，并说出为什么
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
obj.push(3)
console.log(obj);

// 第一次push时 长度为3，下标为 2 的值变成1, 最后长度为5

// 10.用css画一个扇形？
/* 
    width: 0;
    height: 0;
    border: solid 100px red;
    border-color: red transparent transparent transparent;
    border-radius: 100px;
*/

let obj1 = {
    age: 11,
    cars: ['benz','audi','bmw']
}
let obj2 = {...obj1}


// ----------
// function foo(){
//     let a={name:'me'}
//     let b={who:'isMe'}
//     let wm=new WeakMap()
//     function bar(){
//       console.log(a)  // a被闭包保留
//       wm.set(b,1) // 弱引用b对象
//       return wm //wm被闭包保留
//     }
//     return bar
//   }
//   const wm=foo()()
//   console.dir(wm) // No properties 即为空
  

function foo(){
abc= 123;
}
foo()

// bind
Function.prototype._bind = function(target,...rest){
    console.log(rest)
    const context = target||window;

    const fn = this;

    return function(...rest){
        fn.call(context,...rest)
    }

}

function bindTest(a){
    console.log(this,a)
}

bindTest._bind(obj1)(1)