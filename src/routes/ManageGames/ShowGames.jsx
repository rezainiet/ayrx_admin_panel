import { Button, Col, Row } from 'antd';
import { PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

const ShowGames = () => {
    const [games, setGames] = useState([]);

    const initialGames = [
        {
            _id: '1',
            name: 'Cyberpunk 2077',
            coverPhoto: 'https://via.placeholder.com/150',
            description: 'A futuristic open-world RPG.',
            genre: 'RPG',
            ratings: 4.5
        },
        {
            _id: '2',
            name: 'Valorant',
            coverPhoto: 'https://via.placeholder.com/150',
            description: 'Tactical first-person shooter.',
            genre: 'FPS',
            ratings: 4.2
        }
    ];

    return (
        <>
            <Col xs={24} sm={12} className='bg-green-50 items-center justify-center flex py-5'>
                <div className="manage-games-option">

                    <div className="manage-games-option-content">
                        <h2>Show Games</h2>
                        <p>Show a list of all available games. And choose what you want to do...</p>
                        <Button icon={<AppstoreOutlined className="manage-games-option-icon" />} type='primary'>Show Games</Button>
                    </div>
                </div>
            </Col>

            {/* Display existing games */}
            <Row gutter={[16, 16]}>
                {games.map((game) => (
                    <Col key={game._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<Image src={game.coverPhoto} alt={game.name} />}
                            actions={[
                                <Button type="primary" key={`modify-${game._id}`} onClick={() => message.info(`Modify game with ID: ${game._id}`)}>
                                    Modify
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={game.name}
                                description={game.description}
                            />
                            <div style={{ marginTop: '10px' }}>
                                <span>Genre: {game.genre}</span><br />
                                <span>Ratings: {game.ratings}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ShowGames