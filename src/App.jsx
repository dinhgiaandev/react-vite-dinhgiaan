import './components/todo/todo.css'
import TodoData from './components/todo/TodoData'
import TodoNew from './components/todo/TodoNew'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

  const [todoList, setTodoLits] = useState([
    { id: 1, name: "Learning React" },
    { id: 2, name: "Learning Course" }
  ]);

  const dinhgiaan = "Dinhgiaan";
  const age = 25;
  const data = {
    address: "Ho Chi Minh",
    country: "Vietnam"
  }

  const addNewTodo = (name) => {
    alert(`Call me ${name}`)
  }
  // addNewTodo();

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name={dinhgiaan}
        age={age}
        data={data}
        todoList={todoList}
      />
      <div className='todo-image'>
        <img src={reactLogo} className='logo' />
      </div>
    </div>
  )
}

export default App
