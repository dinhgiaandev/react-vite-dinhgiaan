const TodoNew = (props) => {
    const { addNewTodo } = props;
    // addNewTodo('Dinhgiaan Dev');

    const handleClick = () => {
        alert('Click me')
    }

    const handleOnChange = (name) => {
        console.log('>> Check handle ', name)
    }
    return (
        <div className='todo-action'>
            <input type="text" className='input-text' placeholder='Enter your task here'
                onChange={(event) => { handleOnChange(event.target.value) }}
            />
            <button className='btn-add'
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default TodoNew;