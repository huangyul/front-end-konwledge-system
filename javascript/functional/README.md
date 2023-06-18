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

## 闭包

可以另一个作用域内调用一个函数内部函数并访问到该函数作用域中的成员

```js
function fun1() {
  let msg = "hello"
  return function() {
    console.log(msg) // 这用了外部函数的变量
  }
}
```


