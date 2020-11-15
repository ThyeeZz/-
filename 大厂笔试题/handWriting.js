/*
1、手写 call apply bind
*/
function test(a){
    console.log(this,a)
}
// call
Function.prototype._call = function(context,...rest){
    context = context||window;

    context.fn = this;

    const result = context.fn(...rest)

    delete context.fn;
    return result
}

// apply
Function.prototype._apply = function(context,rest){
    context = context||window;

    context.fn = this;

    const result = context.fn(...rest)

    delete context.fn;
    return result
}

// bind
Function.prototype._bind = function(context){
    context = context || window;
    const fn = this;
    return function(...rest){
        fn.call(context, ...rest)
    }
}
const obj = {
    name: 'zxy',
    age: 12
}
// test._call(obj,1)
// test._apply(obj,[2])
// test._bind(obj)(3)


/*
1、观察者模式：发现改变 自动更新
*/

class Observer{
    subscripets = new Set();
    dep(){
        if(isUpdate){
            this.subscripets.add(isUpdate)
        }
    }

    noty(){
        console.log(this.subscripets)
        this.subscripets.forEach(sub => sub());
    }
}

const obs = new Observer();

Object.keys(obj).forEach(prop =>{
    let temp = obj[prop]
    Object.defineProperty(obj,prop,{
        get(){
            obs.dep()
            console.log('get'+temp)
            return temp
        },
        set(val){
            obs.noty()
            console.log('set'+val)
            temp =val
        }
    })
})

let isUpdate = undefined

const autoRun = (update)=>{
    const wraper = function(){
        isUpdate = wraper;
        update()
    }
    wraper()
    isUpdate = undefined
}

autoRun(()=>{
    obs.dep()
    console.log('update')
})

