import React from 'react';
import { Menu, Dropdown, Avatar, message } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../redux/adminSlice';

const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate('');

    const handleLogout = () => {
        dispatch(logoutAdmin());
        message.success('You have been logged out successfully');
        navigate('/login')
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/settings/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
    );
};

export default UserMenu;
