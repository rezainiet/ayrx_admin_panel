import React, { useState } from 'react';
import { Modal, Input, Button, message, Row, Col, Card, Form, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ShowGames from './ShowGames';
import axios from 'axios';

const ManageGames = () => {
    const [visible, setVisible] = useState(false);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [gameForm] = Form.useForm();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleCreateGame = async (values) => {
        setLoading(true);
        try {
            // Upload image to imgbb and get the URL
            const imageUrl = await uploadImageToImgbb(fileList[0].originFileObj);
            // Post game details to the backend API
            await postGameDetails({ ...values, coverPhoto: imageUrl });
            message.success('Game created successfully.');
            setVisible(false);
            gameForm.resetFields();
            setFileList([]); // Clear the file list after successful submission
        } catch (error) {
            console.error(error);
            message.error('Failed to create game. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const uploadImageToImgbb = async (file) => {
        const formData = new FormData();
        const base64Image = await convertToBase64(file);
        formData.append('image', base64Image.split(',')[1]); // remove 'data:image/jpeg;base64,' part
        const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data.url;
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const postGameDetails = async (gameData) => {
        axios.defaults.withCredentials = true;
        await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/games/create`, gameData);
        setGames([...games, { ...gameData, _id: String(Math.random()) }]); // Adjust to use actual ID from backend
    };

    const handleImageUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <div className="manage-games-container mt-8.">
            <h1 className="text-3xl ">Manage Games</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} className='bg-slate-200 items-center justify-center flex py-5'>
                    <Card title='Create a Game' className="manage-games-option" onClick={showModal}>
                        <div className="manage-games-option-content">
                            <p>Create a new game by clicking this button and fill-up the form.</p>
                            <Button icon={<PlusOutlined className="manage-games-option-icon" />}>Create Game</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal
                title="Create New Game"
                visible={visible}
                onOk={() => gameForm.submit()}
                onCancel={handleCancel}
                okText="Create"
                cancelText="Cancel"
                confirmLoading={loading}
            >
                <Form
                    form={gameForm}
                    onFinish={handleCreateGame}
                    layout="vertical"
                    initialValues={{ ratings: 0 }}
                    requiredMark={false}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter the game name.' }]}
                    >
                        <Input placeholder="Enter game name" />
                    </Form.Item>
                    <Form.Item
                        name="coverPhoto"
                        label="Cover Photo"
                        rules={[{ required: true, message: 'Please upload the cover photo.' }]}
                    >
                        <Upload
                            name="coverPhoto"
                            listType="picture"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleImageUpload}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the game description.' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter game description" />
                    </Form.Item>
                    <Form.Item
                        name="genre"
                        label="Genre"
                    // rules={[{ required: true, message: 'Please enter the game genre.' }]}
                    >
                        <Input placeholder="Enter game genre" />
                    </Form.Item>
                    <Form.Item
                        name="ratings"
                        label="Ratings"
                    // rules={[{ required: true, message: 'Please enter the game ratings.' }]}
                    >
                        <Input type="number" min={1} max={5} placeholder="Enter game ratings" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageGames;
