import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    TeamOutlined,
    AppstoreOutlined,
    MailOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sidebar = () => {
    const url = window.location.pathname;
    const [collapsed, setCollapsed] = useState(false);

    if (url.includes('login')) {
        return null
    }

    return (
        <div className="h-full bg-gray-800 text-white mt-16">
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['dashboard']}
                inlineCollapsed={collapsed}
                onClick={({ key }) => {
                    if (key === 'toggle') {
                        setCollapsed(!collapsed);
                    }
                }}
            >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to="/">Dashboard</Link>
                </Menu.Item>
                <SubMenu key="dashboard" icon={<UserOutlined />} title="Users">
                    <Menu.Item key="2">
                        <Link to="/users/list">User List</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/users/add">Add User</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="withdrawals" icon={<UserOutlined />} title="Withdrawals">
                    <Menu.Item key="10">
                        <Link to="/withdrawals/pending">Pending Withdrawals</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="games" icon={<AppstoreOutlined />} title="Games">
                    <Menu.Item key="4">
                        <Link to="/games/lists">Game Lists</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/games/manage-games">Manage Games</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="forums" icon={<AppstoreOutlined />} title="Forums">
                    <Menu.Item key="6">
                        <Link to="/forums/posts">Posts</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/forums/manage-posts">Create Posts</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                    <Menu.Item key="8">
                        <Link to="/settings/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to="/settings">Settings</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="toggle" icon={collapsed ? <MailOutlined /> : <TeamOutlined />}>
                    {collapsed ? "Expand" : "Collapse"}
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Sidebar;
