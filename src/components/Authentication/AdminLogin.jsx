import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthAdmin } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const authAdmin = useSelector(state => {
        console.log(state); // Log the entire Redux state
        return state.admin.authAdmin;
    });
    console.log(authAdmin)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async (values) => {
        setLoading(true);
        console.log(values)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/login-admin`, values, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response)
            dispatch(setAuthAdmin(response.data)); // Store the logged-in admin in Redux
            localStorage.setItem('admin', JSON.stringify(response.data)); // Store admin data in local storage
            message.success('Login successful');
            navigate('/')

            // Handle successful login, e.g., redirect to admin dashboard
        } catch (error) {
            if (error?.response?.status === 403) {
                message.error("You don't have any permission to log in admin panel!")
            }
            else {
                console.error(error);

                message.error('Login failed. Please check your credentials and try again.');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card title="Admin Login" style={{ width: 300 }}>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
