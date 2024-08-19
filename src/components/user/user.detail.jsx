import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service'

const UserDetail = (props) => {

    const { isUserDetailOpen, setIsUserDetailOpen, userDetail, setUserDetail, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, userDetail._id, userDetail.fullName, userDetail.phone)
            if (resUpdateAvatar.data) {
                setIsUserDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update User Avatar",
                    description: "Update User Avatar Success!"
                })
            } else {
                notification.error({
                    message: "Error Update Avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
                return;
            }
        } else {
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }
    }

    return (
        <Drawer
            width={"20vw"}
            title="User Detail"
            onClose={() => {
                setUserDetail(null)
                setIsUserDetailOpen(false)
            }}
            open={isUserDetailOpen}
            maskClosable={false}
        >
            {userDetail
                ?
                <>
                    <p>Id: {userDetail._id}</p>
                    <p>Full Name: {userDetail.fullName}</p>
                    <p>Phone: {userDetail.phone}</p>
                    <p>Avatar:</p>
                    <div style={{
                        marginTop: "10px",
                        height: "150px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
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
                        <input
                            type="file"
                            hidden id="btnUpload"
                            // onChange={handleOnchangeFile}
                            onChange={(event) => handleOnchangeFile(event)}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                height: "150px", width: "150px",
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                            <Button
                                type="primary"
                                onClick={() => handleUpdateUserAvatar()}
                            >Save</Button>
                        </>
                    }
                </>
                :
                <div>No Data.</div>
            }
        </Drawer>
    )
}

export default UserDetail;