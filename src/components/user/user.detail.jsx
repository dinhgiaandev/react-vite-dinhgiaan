import { Button, Input, notification, Modal, Drawer } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from '../../services/api.service'

const UserDetail = (props) => {

    const { isUserDetailOpen, setIsUserDetailOpen, userDetail, setUserDetail } = props;
    return (
        <Drawer
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
                    <div>
                        <span>Id: {userDetail._id}</span>
                    </div>
                    <div>
                        <span>Full Name: {userDetail.fullName}</span>
                    </div>
                    <div>
                        <span>Phone: {userDetail.phone}</span>
                    </div>
                </div>
            </>
                :
                <div>No Data.</div>
            }
        </Drawer>
    )
}

export default UserDetail;