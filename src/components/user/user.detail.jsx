import { Drawer } from "antd";
import { useState } from "react";

const UserDetail = (props) => {

    const { isUserDetailOpen, setIsUserDetailOpen, userDetail, setUserDetail } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
        console.log(">>> check file: ", file)
    }

    console.log(">>>> check: ", preview)
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
            {userDetail
                ?
                <>
                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <span>Id: {userDetail._id}</span>
                        <span>Full Name: {userDetail.fullName}</span>
                        <span>Phone: {userDetail.phone}</span>
                        <span>Avatar:</span>
                        <div style={{
                            marginTop: "10px",
                            height: "150px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userDetail.avatar}`} />
                        </div>
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
                            onChange={handleOnchangeFile}
                        />
                        {preview &&
                            <div style={{
                                marginTop: "10px",
                                height: "150px", width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                        }
                    </div>
                </>
                :
                <div>No Data.</div>
            }
        </Drawer>
    )
}

export default UserDetail;