import React from 'react';
import { Card, List } from 'antd';

const activities = [
    'User John added a new item',
    'User Jane updated her profile',
    'System generated a new report',
    'User Mike deleted a file',
];

const RecentActivities = () => (
    <Card title="Recent Activities">
        <List
            size="small"
            bordered
            dataSource={activities}
            renderItem={item => <List.Item>{item}</List.Item>}
        />
    </Card>
);

export default RecentActivities;
