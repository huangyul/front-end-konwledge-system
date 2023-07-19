# 基础

## hooks

hooks可以使函数式组件拥有类组件的一些生命周期

### useState

使函数组件可以保存状态

```jsx
function Add() {
  const [count, setCount] = useState(0)
  const handleAdd = () => {
    setCount(count => count + 1)
  }
  // 如果状态是一个对象或数组，而你没有改变整个对象，可以使用解构的方式
  const [person, setPerson] = useState({name: 'hh', age:20})
  const handlePerson = () => {
    setPerson(person => {
      return {...person, age: 22}
    })
  }

  const personList = Object.keys(person).map(key => <p key={key}>{person[key]}</p>)
  return (
    <div>
      <p>{count}</p>
      {personList}
      <button onClick={handleAdd}>add one</button>

    </div>
  )
}

```

### useReducer

另外一种保存状态的钩子函数

用法：
- 先定义好`reducer`函数

```jsx
function Foo() {
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1
      default:
        return state
    }
  }

  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    </div>
  )
}
```

### useContext

用于简化createContext的使用

```jsx
const themeContext = createContext()

function Parent() {
  return (
    <div>
       {/* 传递给子组件的数据 */}
      <themeContext.Provider value={10}>
        <Child></Child>
      </themeContext.Provider>
    </div>
  )
}

function Child() {
  // 原本的用法
  // return (
  //   <div>
  //     <themeContext.Consumer>
  //       {
  //         value => <div>{value}</div>
  //       }
  //     </themeContext.Consumer>
  //   </div>
  // )

  // 使用useContext
  const value = useContext(themeContext)
  return (
    <div>{value}</div>
  )
}
```

### useEffect

用于监听生命周期

有三种形式：
1. useEffect(() => {}): 在组件挂载和和更新都会执行
2. useEffect(() => {}, []): 在组件挂载会执行
3. useEffect(() => () => {}): 在组件销毁会执行

```jsx

function Foo() {
  const [count, setCount] = setState(0)

  // 第二参数如果传了，等于在这个值更新才会执行，类似vue的watch
  useEffect(() => {
    // do something
    document.title = count
    return () => {
      // 组件销毁时 dosomething
      document.title = 'react'
    }
  }, [count])
} 
```
