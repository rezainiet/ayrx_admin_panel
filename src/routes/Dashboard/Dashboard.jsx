import React from 'react';
import { Row, Col } from 'antd';
import StatisticsCard from '../../components/DashboardComponents/StatisticsCard';
import LineChart from '../../components/DashboardComponents/Charts/LineChart';
import BarChart from '../../components/DashboardComponents/Charts/BarChart';
import UserManagement from '../../components/DashboardComponents/UserManagement';
import PostManagement from '../../components/DashboardComponents/PostManagement';
import GameManagement from '../../components/DashboardComponents/GameManagement';

const Dashboard = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <StatisticsCard title="Total Users" value={1234} precision={0} />
                </Col>
                <Col span={8}>
                    <StatisticsCard title="Total Posts" value={456} precision={0} />
                </Col>
                <Col span={8}>
                    <StatisticsCard title="Total Revenue" value={7890} precision={2} prefix="$" />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <LineChart />
                </Col>
                <Col span={12}>
                    <BarChart />
                </Col>
            </Row>
            {/* <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={24}>
                <UserManagement />
            </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={24}>
                <PostManagement />
            </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={24}>
                <GameManagement />
            </Col>
        </Row> */}
        </div>
    )
};

export default Dashboard;
