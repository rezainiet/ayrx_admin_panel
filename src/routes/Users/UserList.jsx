import React from 'react';
import { Divider, Table } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        email: 'john.brown@example.com',
        role: 'Admin',
    },
    {
        key: '2',
        name: 'Jim Green',
        email: 'jim.green@example.com',
        role: 'User',
    },
    {
        key: '3',
        name: 'Joe Black',
        email: 'joe.black@example.com',
        role: 'User',
    },
];

const UserList = () => (
    <>
        <div>
            <h1 className='text-2xl font-semibold'>Sample Users</h1>
            <Divider />
        </div>
        <Table columns={columns} dataSource={data} />
    </>
);

export default UserList;
