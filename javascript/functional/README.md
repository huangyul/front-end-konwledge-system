# 函数式编程

## 什么是函数式编程

函数式编程是一个编程范式，对应的还有面向对象编程。

- 面向对象编程：将事物抽象成类和对象，通过封装、继承和多态演示事物间的联系。
- 函数式编程：将运算过程进行抽象。

```js
// 面向过程
let n1 = 2
let n2 = 3
let sum = n1 + n2
console.log(sum)
console.log(arr)
// 函数式
function sum(n1, n2) {
    return n1 + n2
}
console.log(sum(1, 2))
```

# 函数是一等公民

## 函数可以赋值给变量

```js
// 把函数赋值给变量
const controller = {
	index(params) return otherFunc(params)
}
// 上面中，index方法的传参和返回跟内部的otherFunc一样，可以这样优化
const controller = {
	index: otherFunc // 注意，这里是赋值这个函数，不需要加括号
}
```

## 高阶函数

- 可以把函数作为参数传递给另外一个函数
- 可以把函数作为另一个函数的返回结果

常用的高阶函数，如数组的`map`,`every`,`some`等等

# 闭包

可以另一个作用域内调用一个函数内部函数并访问到该函数作用域中的成员

```js
function fun1() {
  let msg = "hello"
  return function() {
    console.log(msg) // 这用了外部函数的变量
  }
}
```

# 纯函数

相同的输入，永远得到相同的输出，而且**没有任何可观察的副作用**

例如数组的方法中，`slice`和`splice`，`slice`不会影响原来的数组，`splice`会改变原来的数组

```js
function pureFunc(n) {
  return n + 1
}
```

### 纯函数的函数

- 因为相同的输入始终有相同的结果，所以可以将结果进行缓存

```js
function memoize(f) {
  // 定义一个缓存
  const cache = {}
  return funcion() {
    // 拿到调用函数的参数
    let kee = JSON.stringify(arguments)
    cache[key] = cache[key] || f.apply(f, arguments)
    return cache[key]
  }
}
```

### 函数的副作用

就是一个函数有依赖外部的变量

```js
let mini = 18
function checkAge(age) {
  return age >= mini
}
```

### 柯里化

- 当一个函数有多个参数的时候，先传递一个部分参数调用它（这部分参数后续就不会改变了）
- 然后返回一个新的函数接收剩余的参数，返回结果

```js
// 原来的函数需要依赖一个min参数
function func1(age) {
  let min = 18
  return age <= 18
}

// 柯里化
function func2(min) {
  return function(age) {
    return age >= min
  }
}

// 这样就可以实现达到不依赖外部的参数
let checkAge18 = func2(18)

// 箭头函数的写法
let check = min => (age => age >= min)
```
