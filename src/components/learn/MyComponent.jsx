import './style.css'

const MyComponent = () => {
    // const dinhgiaan = "kato";
    const arr = [1, 2, 3];
    // const mySelf = {
    //     name: "Dinhgiaan",
    //     age: 20
    // };
    return (
        <>
            <div> {JSON.stringify(arr)} & Hello World. </div>
            <div>{console.log('Dinhgiaan1')}</div>
            <div className='child' style={{ borderRadius: "10px" }}> Yes Sir!</div>
        </>
    );
}
export default MyComponent;