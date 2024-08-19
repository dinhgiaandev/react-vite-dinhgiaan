import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, notification } from 'antd';
import { useState } from 'react';
import UpdateUser from './update.user.modal';
import UserDetail from './user.detail';
import { deleteUserAPI } from '../../services/api.service';
import { json } from 'react-router-dom';

const UserTable = (props) => {

    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState("");

    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

    const [userDetail, setUserDetail] = useState("");

    const columns = [
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

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
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