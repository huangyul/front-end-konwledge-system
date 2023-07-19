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
