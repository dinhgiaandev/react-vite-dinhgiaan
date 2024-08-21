import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);

    console.log(">>>check data: ", user)

    const onClick = (e) => {
        setCurrent(e.key);
    };

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
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to='/login'>Login</Link>,
                    key: 'login',
                },
                {
                    label: <Link to='/login'>Logout</Link>,
                    key: 'logout',
                },
            ],
        },
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