import React from 'react';
import { Form, Input, Button } from 'antd';

const AddUser = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="addUser"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the user\'s name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the user\'s email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add User
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUser;
