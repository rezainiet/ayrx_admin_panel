import React from 'react';
import { Bar } from '@ant-design/charts';

const data = [
    { year: '2020', value: 3 },
    { year: '2021', value: 4 },
    { year: '2022', value: 3.5 },
    { year: '2023', value: 5 },
    { year: '2024', value: 4.9 },
];

const BarChart = () => {
    const config = {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: { position: 'top-left' },
    };

    return <Bar {...config} />;
};

export default BarChart;
