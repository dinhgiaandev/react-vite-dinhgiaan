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
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        //ở đây truyền vào object { user, setUser } tương tự như cách dùng props
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
            {/*console.log bên App coi ví dụ về ParentComponent và ChildComponent để coi thử children là gì */}
            {/* hoặc  <RouterProvider router={router} /> */}
        </AuthContext.Provider>
    )
}