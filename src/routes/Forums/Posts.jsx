import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Input, message, Skeleton, Popconfirm } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const { Text, Title } = Typography;

const ForumPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, posts]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/forumPosts/getPost`);
            setPosts(response.data || []);
            setFilteredPosts(response.data || []);
        } catch (error) {
            setError('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = posts;

        if (searchTerm) {
            filtered = filtered.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPosts(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleModify = (postId) => {
        // Implement modify functionality here
        message.info(`Modify post with ID: ${postId}`);
    };

    const handleDelete = (postId) => {
        // Implement delete functionality here
        message.success(`Post with ID: ${postId} deleted successfully`);
    };

    const columns = [
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (author) => (
                <>
                    <div className='flex items-center'>
                        <LazyLoadImage
                            effect="blur"
                            alt={author.fullName}
                            height={'30px'}
                            src={author.profilePhoto} // use normal <img> attributes as props
                            width={'30px'} />

                        <span style={{ marginLeft: '10px' }}>{author.fullName}</span>
                    </div>
                </>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text, record) => (
                <>
                    <Button type="primary" onClick={() => handleModify(record.key)}>
                        Modify
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this post?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger disabled style={{ marginLeft: '8px' }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const dataSource = filteredPosts.map((post) => ({
        key: post._id,
        author: post.user,
        title: post.title,
        content: post.content,
    }));

    return (
        <div className='mt-8'>
            <Title level={2}>Forum Posts</Title>
            <div className="flex justify-between mb-5">
                <div>
                    <Button type="primary" disabled onClick={() => navigate('/create-post')}>
                        Add Post
                    </Button>
                </div>
                <div>
                    <Input.Search
                        placeholder="Search posts"
                        enterButton
                        onSearch={(value) => setSearchTerm(value)}
                        style={{ marginRight: '10px', width: '300px' }}
                    />
                </div>
            </div>
            {loading && <Skeleton active />}
            {error && <Text type="danger">{error}</Text>}
            {!loading && !error && filteredPosts.length > 0 && (
                <>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: filteredPosts.length,
                            onChange: handlePageChange,
                        }}
                    />
                </>
            )}
            {!loading && !error && filteredPosts.length === 0 && <Text type="secondary">No posts found.</Text>}
        </div>
    );
};

export default ForumPosts;
