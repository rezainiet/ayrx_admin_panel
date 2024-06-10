import React from 'react';
import { Layout, Avatar } from 'antd';
import { UserOutlined } from "@ant-design/icons"
const { Header } = Layout;

const AppHeader = () => (
    <Header className="bg-white shadow-sm flex justify-between items-center px-4">
        <div className="text-xl">Admin Panel</div>
        <Avatar size="large" icon={<UserOutlined />} />
    </Header>
);

export default AppHeader;
