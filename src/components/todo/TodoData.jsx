const TodoData = (props) => {

    //Destructuring object
    const { name, age, data } = props;
    console.log('>> Check props: ', props)
    return (
        <div className='todo-data'>
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Learning Course</div>
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    );
}

export default TodoData;