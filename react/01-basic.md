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

### useMemo

类似于计算属性，computed

```jsx
function Foo() {
  const [count, setCount] = useState(0)
  const sum = useMemo(() => {
    return count+1
  }, [count])
  return (
    <div>
      <button onClick={() => setCount(count+1)}></button>
    </div>
  )
}
```

### memo

性能优化，如果组件中的数据没有发生变化，就阻止组件更新

```jsx
function Foo() {
  return <div>Foo</div>
}

export default memo(Foo)
```

### useCallback

性能优化，缓存函数，使得组件重新渲染时得到相同的函数实例

```jsx
function Foo() {
  const [count, setCount] = useState(0)
  // 通过useCallback包裹的函数在重新渲染时会得到相同的函数实例，这样将该函数传递给子组件的时候等于传了相同的函数，配合memo就不会让子组件更新
  const resetCount = useCallback(() => {
    setCount(0)
  }, [setCount])

  return (
    <div>
      <p>{count}</p>
      <Bar setCount={setCount}></Bar>
    </div>
  )
}

function Bar(props) {
  return (
    <button onClick={props.resetCount}></button>
  )
}

export default memo(Bar)
```

### useRef 

获取dom元素对象

```jsx

function Foo() {
  const box = useRef()

  return (
    <div ref={box}></div>
  )
}
```
