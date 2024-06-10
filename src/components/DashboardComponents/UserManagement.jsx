import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
// Assume these API functions are implemented
// import { getUsers, deleteUser } from '../api'; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const test = 'something';
    const { getUsers, deleteUser } = test;

    const fetchUsers = async () => {
        const result = await getUsers();
        setUsers(result);
    };

    const handleDelete = async (userId) => {
        await deleteUser(userId);
        message.success('User deleted successfully');
        fetchUsers();
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserManagement;
