const TodoData = (props) => {
    //Destructuring object
    const { todoList } = props;
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item ${index}`} key={index.id}>
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default TodoData;