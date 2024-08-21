import { createContext, useState } from 'react';

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    //user here mean is: user login
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "Ân love Phương nhiều lắm",
        role: "Chồng của Nam Phương <3",
        avatar: "",
        id: ""
    })
    return (
        //ở đây truyền vào object { user, setUser } tương tự như cách dùng props
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}