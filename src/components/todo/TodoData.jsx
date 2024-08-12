const TodoData = (props) => {
    //Destructuring object
    const { todoList, deleteTodo } = props;
    const handleClick = (id) => {
        deleteTodo(id)
    }

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item ${index}`} key={index.id}>
                        <div>{item.name}</div>
                        <button onClick={() => handleClick(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoData;