const TodoData = (props) => {
    const { name, age, data } = props;
    console.log('>> Check props: ', props)
    return (
        <div className='todo-data'>
            <div>My name is {age}</div>
            <div>Learning React</div>
            <div>Learning Course</div>
        </div>
    );
}

export default TodoData;