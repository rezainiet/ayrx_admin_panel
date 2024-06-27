import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Descriptions, message, Spin } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';

const PendingWithdrawals = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchPendingWithdrawals = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/withdrawal/getPendingWithdrawals`);
                setWithdrawals(response.data);
            } catch (error) {
                message.error('Error fetching pending withdrawals');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingWithdrawals();
    }, []);

    const showModal = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleApprove = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/withdrawal/approveWithdrawal/${id}`);
            message.success('Withdrawal approved successfully');
            setWithdrawals(withdrawals.filter(w => w._id !== id));
        } catch (error) {
            message.error('Error approving withdrawal');
        }
    };

    if (loading) {
        return <Spin size="large" />;
    }

    const columns = [
        {
            title: 'User Name',
            dataIndex: ['userId', 'fullName'],
            key: 'fullName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => showModal(record)}
                    >
                        View
                    </Button>
                    <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => handleApprove(record._id)}
                        style={{ marginLeft: 8 }}
                    >
                        Approve
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Table
                columns={columns}
                dataSource={withdrawals}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                bordered
            />
            <Modal
                title="Withdrawal Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedWithdrawal && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="User Name">
                            {selectedWithdrawal?.userId?.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Amount">
                            {selectedWithdrawal.amount}
                        </Descriptions.Item>
                        <Descriptions.Item label="Method">
                            {selectedWithdrawal.method}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Details">
                            {selectedWithdrawal.method === 'PayPal'
                                ? selectedWithdrawal.paypalEmail
                                : selectedWithdrawal.bankDetails}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default PendingWithdrawals;
