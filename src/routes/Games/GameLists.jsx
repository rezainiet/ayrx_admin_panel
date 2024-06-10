import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Select, Input, message, Skeleton } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
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

    const handleModify = (id) => {
        if (id) {
            message.info(`Modify game with ID: ${id}`);
            // Implement modify functionality here
        } else {
            message.error("Game ID is undefined");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddGame = () => {
        navigate('/create-game');
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
                <div className="action-buttons">
                    <Button type="primary" icon={<SettingOutlined />} onClick={() => handleModify(record.key)}>
                        Modify
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
        </div>
    );
};

export default GameLists;
