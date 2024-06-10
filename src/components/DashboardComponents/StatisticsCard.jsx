import React from 'react';
import { Card, Statistic } from 'antd';

const StatisticsCard = ({ title, value, precision, suffix }) => (
    <Card>
        <Statistic
            title={title}
            value={value}
            precision={precision}
            suffix={suffix}
            valueStyle={{ color: '#3f8600' }}
        />
    </Card>
);

export default StatisticsCard;
