import { Link, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout Success.");

            //redirect to home
            navigate("/");

        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />
        },

        //!user.id - nếu không có user.id
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />
        },] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Logout</span>,
                    key: 'logout',
                },
            ],
        },] : []),

    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}
export default Header;