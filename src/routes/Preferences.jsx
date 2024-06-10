import React from 'react';
import { Form, Input, Button } from 'antd';

const Preferences = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Form
            name="preferences"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                label="Theme"
                name="theme"
                rules={[{ required: true, message: 'Please input your theme preference!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Language"
                name="language"
                rules={[{ required: true, message: 'Please input your language preference!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Preferences;
