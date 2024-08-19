import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    //empty array => run once
    //not empty array => next value != prev value: bất cứ khi nào giá trị khác nhau, nó sẽ chạy lại
    useEffect(() => {
        loadUser();
    }, [current, pageSize]); //truyền current và pageSize vào = [] + condition, và condition là: next value != prev value
    //loadUser có tác dụng reload lại table khi tạo mới user
    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        //dựa vào API để làm: res.data...
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm
                loadUser={loadUser}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}
export default UserPage;