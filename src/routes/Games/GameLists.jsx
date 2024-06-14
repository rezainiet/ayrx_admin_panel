import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Select, Input, message, Skeleton, Modal, Form, InputNumber } from 'antd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GameLists.css';

const { Option } = Select;
const { Title, Text } = Typography;

const GameLists = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGames();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, genreFilter, games]);

    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/games/getGames`);
            setGames(response.data || []);
            setFilteredGames(response.data || []);
        } catch (error) {
            setError('Failed to fetch games. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = games;

        if (searchTerm) {
            filtered = filtered.filter((game) =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (genreFilter) {
            filtered = filtered.filter((game) => game.genre.toLowerCase() === genreFilter.toLowerCase());
        }

        setFilteredGames(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const showModifyModal = (game) => {
        setSelectedGame(game);
        form.setFieldsValue({
            name: game.name,
            description: game.description,
            ratings: game.ratings,
            coverPhoto: game.coverPhoto,
        });
        setIsModalVisible(true);
    };

    const handleModify = async (values) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/games/updateGame/${selectedGame.key}`, values);
            message.success('Game modified successfully');
            fetchGames(); // Refresh the game list
        } catch (error) {
            message.error('Failed to modify the game. Please try again later.');
        } finally {
            setIsModalVisible(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            axios.defaults.withCredentials = true
            await axios.delete(`${import.meta.env.VITE_API_URI}/api/v1/games/deleteGame/${id}`);
            message.success('Game deleted successfully');
            fetchGames(); // Refresh the game list
        } catch (error) {
            message.error('Failed to delete the game. Please try again later.');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddGame = () => {
        navigate('/games/manage-games');
    };

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'coverPhoto',
            key: 'coverPhoto',
            render: (coverPhoto) => <img src={coverPhoto} alt="cover" className="game-cover-photo" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Rating',
            dataIndex: 'ratings',
            key: 'ratings',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text, record) => (
                <div className=" flex gap-3 items-center justify-center">
                    <Button type="primary" icon={<SettingOutlined />} onClick={() => showModifyModal(record)}>
                        Modify
                    </Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const dataSource = filteredGames.map((game) => ({
        key: game._id,
        coverPhoto: game.coverPhoto,
        name: game.name,
        genre: game.genre,
        ratings: game.ratings,
        description: game.description,
    }));

    return (
        <div className="game-list-container">
            <div className="header">
                <Title level={2} className="header-title">Games</Title>
                <Button type="primary" onClick={handleAddGame}>Add Game</Button>
            </div>
            <div className="filters">
                <Input.Search
                    placeholder="Search games"
                    enterButton
                    onSearch={(value) => setSearchTerm(value)}
                    style={{ marginRight: '10px', width: '300px' }}
                />
                <Select
                    placeholder="Filter by genre"
                    allowClear
                    onChange={(value) => setGenreFilter(value)}
                    style={{ width: '200px' }}
                >
                    <Option value="action">Action</Option>
                    <Option value="adventure">Adventure</Option>
                    <Option value="strategy">Strategy</Option>
                    <Option value="rpg">RPG</Option>
                    {/* Add more genres as needed */}
                </Select>
            </div>
            {loading && (
                <Skeleton active />
            )}
            {error && <Text type="danger" className="error-message">{error}</Text>}
            {!loading && !error && filteredGames.length > 0 && (
                <>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: filteredGames.length,
                            onChange: handlePageChange,
                        }}
                        scroll={{ x: 'max-content' }} // Enable horizontal scroll
                        className="game-table"
                    />
                </>
            )}
            {!loading && !error && filteredGames.length === 0 && (
                <Text type="secondary" className="no-games-message">No games found.</Text>
            )}
            <Modal
                title="Modify Game"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleModify} layout="vertical">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="ratings" label="Ratings">
                        <InputNumber min={0} max={10} />
                    </Form.Item>
                    <Form.Item name="coverPhoto" label="Cover Photo URL">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default GameLists;
