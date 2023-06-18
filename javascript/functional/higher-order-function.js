// 高阶函数-函数作为参数

function forEach(arr, fn) {
  for(let i = 0; i < arr.length; i++) {
    fn(arr[i])
  }
}

let arr = [1,2,3,4]
forEach(arr, (item) => {
  console.log(item)
})


function filter(arr, fn) {
  const res = []
  for(let i = 0; i < arr.length; i++) {
    if(fn(arr[i])) res.push(arr[i])
  }
  return res
}

const testFilterArr = filter(arr, (item) => {return item > 2})
console.log(testFilterArr)


// 高级函数-函数作为返回值

function makeFn() {
  let msg = "function1"
  return function() {
    console.log(msg)
  }
}

makeFn()()

