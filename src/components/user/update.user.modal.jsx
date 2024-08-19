import { Button, Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from '../../services/api.service'

const UpdateUser = (props) => {


    const { loadUser, isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmitUpdateBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone)
        if (res.data) {
            notification.success({
                message: 'Update User',
                description: 'Update User Success!'
            })
            setIsModalUpdateOpen(false);
            await loadUser();
        } else {
            notification.error({
                message: 'Error Update User',
                description: JSON.stringify(res.message)
            })
        }
    }

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate("");
    }
    return (
        <Modal
            title="Update User"
            open={(isModalUpdateOpen)}
            onOk={() => handleSubmitUpdateBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        onChange={(event) => { setFullName(event.target.value) }}
                        value={fullName}
                    />
                </div>
                <div>
                    <span>Phone</span>
                    <Input
                        onChange={(event) => { setPhone(event.target.value) }}
                        value={phone}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUser;