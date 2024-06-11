import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/settings/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" icon={<LogoutOutlined />}>
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
