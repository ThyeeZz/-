var singleton = function (fn) {
  console.log(this)
  console.log(arguments)
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}

var createMask = singleton(

  function (x,y) {
    return document.body.appendChild(document.createElement('div'));
  }

)

createMask()