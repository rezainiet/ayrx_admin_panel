import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Settings = () => {

    const authAdmin = useSelector(state => {
        return state.admin.authAdmin;
    });
    console.log(authAdmin)
    const onFinish = async (values) => {
        if (authAdmin) {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/user/updateAdminPassword`, {
                    userId: authAdmin?._id, // Assuming you have userId stored somewhere, e.g., in the context or state
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                });

                if (response.status === 200) {
                    message.success('Password updated successfully.');
                }
            } catch (error) {
                console.error('Failed to update password:', error);
                message.error('Failed to update password. Please try again.');
            }
        }
    };

    return (
        <Card title='Change admin Password'>
            <Form
                name="settings"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >

                <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your old password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;
