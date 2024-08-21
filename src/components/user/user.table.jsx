import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, notification } from 'antd';
import { useState } from 'react';
import UpdateUser from './update.user.modal';
import UserDetail from './user.detail';
import { deleteUserAPI } from '../../services/api.service';
import { json } from 'react-router-dom';

const UserTable = (props) => {

    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState("");

    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

    const [userDetail, setUserDetail] = useState("");

    const columns = [
        {
            title: "No.",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setIsUserDetailOpen(true);
                            setUserDetail(record)
                        }}
                    >{record._id}</a>
                )
                //đặt tên là record để ví như nó một bản ghi
                //_id là dựa vào tên Key API
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn xóa user này ?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id)
        if (res.data) {
            notification.success({
                message: 'Delete User',
                description: 'Delete User Success!'
            })
            await loadUser();
        } else {
            notification.error({
                message: 'Delete User',
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log(">>> check: ", { pagination, filters, sorter, extra })
        //nếu thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current != +current) // != current | current này là current bộ nhớ của React
                setCurrent(+pagination.current) //dấu + giúp thay đổi từ string sang số nguyên, ví dụ "5" = 5 Check Network để rõ hơn. Phần: data.meta, current là string, còn total là số nguyên
        }

        //nếu thay đổi tổng số phần tử trang: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) // != pageSize | pageSize này là pageSize bộ nhớ của React
                setPageSize(+pagination.pageSize) // dấu + giúp thay đổi từ string sang số nguyên. Check Network để rõ hơn. Phần: data.meta, pageSize là string, còn total là số nguyên
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            <UpdateUser
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <UserDetail
                isUserDetailOpen={isUserDetailOpen}
                setIsUserDetailOpen={setIsUserDetailOpen}
                userDetail={userDetail}
                setUserDetail={setUserDetail}
                loadUser={loadUser}
            />
        </>
    )
}
export default UserTable;