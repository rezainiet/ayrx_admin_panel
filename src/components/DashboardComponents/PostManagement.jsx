import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
// import { getPosts, createPost, updatePost, deletePost } from '../api'; 
// Assume these API functions are implemented

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const test = 'something';
    const { getPosts, createPost, updatePost, deletePost } = test

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const result = await getPosts();
        setPosts(result);
    };

    const handleSave = async (values) => {
        if (editingPost) {
            await updatePost(editingPost.id, values);
            message.success('Post updated successfully');
        } else {
            await createPost(values);
            message.success('Post created successfully');
        }
        setModalVisible(false);
        fetchPosts();
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        form.setFieldsValue(post);
        setModalVisible(true);
    };

    const handleDelete = async (postId) => {
        await deletePost(postId);
        message.success('Post deleted successfully');
        fetchPosts();
    };

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Content', dataIndex: 'content', key: 'content' },
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
                New Post
            </Button>
            <Table columns={columns} dataSource={posts} rowKey="id" />
            <Modal
                title={editingPost ? 'Edit Post' : 'New Post'}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSave}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PostManagement;
