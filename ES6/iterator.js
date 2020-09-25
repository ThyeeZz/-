const obj = {
  name: {
    firstName: '沙雕',
    lastName: '宓'
  },
  father: ['jjl', '李工'],
  mother: '骚骚'
}

function objIterator(obj) {
  const keys = Object.keys(obj);
  let index = 0;
  return {
    next: function () {
      return index < keys.length ? {
        value: obj[keys[index++]]
      } : {
        done: true
      }
    }
  }
}

const it = objIterator(obj)