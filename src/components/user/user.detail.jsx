import { Button, Input, notification, Modal, Drawer } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from '../../services/api.service'

const UserDetail = (props) => {

    const { isUserDetailOpen, setIsUserDetailOpen, userDetail, setUserDetail } = props;
    return (
        <Drawer
            width={"35vw"}
            title="User Detail"
            onClose={() => {
                setUserDetail(null)
                setIsUserDetailOpen(false)
            }}
            open={isUserDetailOpen}
            maskClosable={false}
        >
            {userDetail ? <>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <span>Id: {userDetail._id}</span>
                    <span>Full Name: {userDetail.fullName}</span>
                    <span>Phone: {userDetail.phone}</span>
                    <span>Avatar:</span>
                    <img
                        height={150} width={150}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userDetail.avatar}`} />
                </div>
                <div>
                    <label
                        htmlFor="btnUpload"
                        style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                        Upload Avatar
                    </label>
                    <input type="file" hidden id="btnUpload" />
                    {/* <Button type="primary">Upload Avatar</Button> */}
                </div>
            </>
                :
                <div>No Data.</div>
            }
        </Drawer>
    )
}

export default UserDetail;