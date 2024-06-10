import { useState } from 'react';
import { Button, Card, Col, Modal, Row, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ManagePosts = () => {
    const { authAdmin } = useSelector(store => store.admin)
    console.log(authAdmin)
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const onFinish = async (values) => {
        try {
            // Make POST request to create a post
            const response = await fetch(`${import.meta.env.VITE_API_URI}/api/forumPosts/createPost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, imageUrl, user: authAdmin?._id }),
                credentials: 'include', // Add this line to include credentials
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const data = await response.json();
            console.log('Post created:', data);
            // Close the modal
            setModalVisible(false);
            // Additional logic like updating state or showing a success message can be added here
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error, show error message to user, etc.
        }
    };

    const uploadProps = {
        name: 'image',
        action: 'https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info?.file?.name} file uploaded successfully`);
                // Get the image URL from the response and set it in state
                setImageUrl(info.file.response.data.url);
            } else if (info?.file?.status === 'error') {
                message.error(`${info?.file?.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="manage-games-container mt-8">
            <h1 className="text-3xl ">Manage Posts</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} className='bg-slate-200 items-center justify-center flex py-5'>
                    <Card title='Create a Post' className="manage-games-option" >
                        <div className="manage-games-option-content">
                            <p>Create a new post by clicking this button and fill-up the form.</p>
                            <Button icon={<PlusOutlined className="manage-games-option-icon" />} onClick={() => setModalVisible(true)}>Create Post</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Create Post"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form
                    name="createPost"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        rules={[{ required: true, message: 'Please input the content!' }]}
                    >
                        <Input.TextArea placeholder="Content" />
                    </Form.Item>
                    <Form.Item
                        name="image"
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ManagePosts;
