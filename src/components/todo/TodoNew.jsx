import { useState } from "react";

const TodoNew = (props) => {

    //useState hook
    // const valueInput = "Kato";
    //Destructuring array
    const [valueInput, setValueInput] = useState('');

    const { addNewTodo } = props;
    // addNewTodo('Dinhgiaan Dev');

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }
    return (
        <div className='todo-action'>
            <input
                type="text" className='input-text' placeholder='Enter your task here'
                onChange={(event) => { handleOnChange(event.target.value) }}
                value={valueInput}
            />
            <button className='btn-add'
                onClick={handleClick}
            >Add</button>
            <div>
                My text input is: {valueInput}
            </div>
        </div>
    );
}

export default TodoNew;