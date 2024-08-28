import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from '../../services/api.service'

const UserForm = (props) => {

    const { loadUser } = props

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: 'Create New User',
                description: 'Create New User Success!'
            })
            setIsModalOpen(false);
            await loadUser();
        } else {
            notification.error({
                message: 'Error Create New User',
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table users</h3>
                <Button type="primary"
                    onClick={() => setIsModalOpen(true)}
                > Create User </Button>
            </div>
            <Modal
                title="Create User"
                open={(isModalOpen)}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            onChange={(event) => { setFullName(event.target.value) }}
                            value={fullName}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            onChange={(event) => { setEmail(event.target.value) }}
                            value={email}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            onChange={(event) => { setPassword(event.target.value) }}
                            value={password}
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
        </div>
    )
}

export default UserForm;