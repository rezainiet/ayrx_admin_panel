import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
// Assume these API functions are implemented
// import { getGames, createGame, updateGame, deleteGame } from '../api'; 

const GameManagement = () => {
    const [games, setGames] = useState([]);
    const [editingGame, setEditingGame] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const result = await getGames();
        setGames(result);
    };

    const handleSave = async (values) => {
        if (editingGame) {
            await updateGame(editingGame.id, values);
            message.success('Game updated successfully');
        } else {
            await createGame(values);
            message.success('Game created successfully');
        }
        setModalVisible(false);
        fetchGames();
    };

    const handleEdit = (game) => {
        setEditingGame(game);
        form.setFieldsValue(game);
        setModalVisible(true);
    };

    const handleDelete = async (gameId) => {
        await deleteGame(gameId);
        message.success('Game deleted successfully');
        fetchGames();
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setModalVisible(true)}>
                New Game
            </Button>
            <Table columns={columns} dataSource={games} rowKey="id" />
            <Modal
                title={editingGame ? 'Edit Game' : 'New Game'}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSave}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default GameManagement;
