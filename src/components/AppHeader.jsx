import React from 'react';
import { Layout, Input } from 'antd';
import UserMenu from './UserMenu';

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => (
    <Header className="bg-white shadow-sm flex justify-between items-center px-4">
        <div className="flex items-center">
            <img src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" alt="Logo" className="h-8 mr-4" />
            <div className="text-xl">Admin Panel</div>
        </div>
        <Search
            placeholder="Search..."
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
        />
        <UserMenu />
    </Header>
);

export default AppHeader;
