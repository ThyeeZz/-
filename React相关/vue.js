// // 1、监听属性的存取
// function convert(obj) {
//   Object.keys(obj).forEach(prop => {
//     let temp = obj[prop];
//     Object.defineProperty(obj, prop, {
//       get: () => {
//         console.log(`访问的属性是${prop}--${temp}`)
//         return temp
//       },
//       set: (val) => {
//         console.log(`存储的属性是${prop}--${val}`)
//         temp = val
//       }
//     })
//   })
// }

// // 2、实现依赖追踪
// class Dep {
//   constructor() {
//     this.subscribers = new Set();
//   }
//   depend() {
//     if (activeUpdate) {
//       // 注册这个 activeupdate 作为订阅者
//       this.subscribers.add(activeUpdate);
//     }
//   }
//   notify(val) {
//     // 运行所有的订阅函数
//     this.subscribers.forEach(sub => sub())
//   }
// }

// let activeUpdate;
// const dep = new Dep();

// const autoRun = (update) => {
//   function wrapperUpdate() {
//     activeUpdate = wrapperUpdate;
//     update()
//     activeUpdate = null;
//   }
//   wrapperUpdate()
// }

// autoRun(() => {
//   dep.depend();
//   console.log('update')
// })

// // dep.notify()



// const state = {
//   count: 0
// }

// const observe = (obj) => {
//   Object.keys(obj).forEach(prop => {
//     let temp = obj[prop];
//     Object.defineProperty(obj, prop, {
//       get: () => {
//         console.log(`访问的属性是${prop}--${temp}`)
//         dep.depend()
//         return temp
//       },
//       set: (val) => {
//         console.log(`存储的属性是${prop}--${val}`)
//         dep.notify();
//         temp = val;
//       }
//     })
//   })
// }

// observe(state)



let obj = {
  name: 'xxx',
  age: 13
}

class Dep{
  constructor(){
    this.subscribers = new Set();
  }
  

  depend(){
    if(activeUpdate){
      console.log(activeUpdate)
      this.subscribers.add(activeUpdate)
    }
  }

  notify(){
    this.subscribers.forEach(sub=>sub())
  }

}

let dep = new Dep();
let activeUpdate = undefined;

const autoRun = function(update){
  function updateWrapper (){
    activeUpdate = updateWrapper;
    update();
    activeUpdate = null;
  }
  updateWrapper();
}

autoRun(()=>{
  dep.depend();
  console.log('update')
})

function convert(obj){
  Object.keys(obj).forEach(prop=>{
    let temp = obj[prop]
    Object.defineProperty(obj,prop,{
      set(val){
        dep.notify()
        temp = val;
      },
      get(){
        dep.depend();
        return temp
      }
    })
  })
}

convert(obj)