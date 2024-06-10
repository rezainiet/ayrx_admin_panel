import React from 'react';
import { Line } from '@ant-design/charts';

const data = [
    { date: '2024-01-01', value: 3 },
    { date: '2024-01-02', value: 4 },
    { date: '2024-01-03', value: 3.5 },
    { date: '2024-01-04', value: 5 },
    { date: '2024-01-05', value: 4.9 },
    { date: '2024-01-06', value: 6 },
    { date: '2024-01-07', value: 7 },
    { date: '2024-01-08', value: 9 },
    { date: '2024-01-09', value: 13 },
];

const LineChart = () => {
    const config = {
        data,
        xField: 'date',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        tooltip: { showMarkers: false },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [{ type: 'marker-active' }],
    };

    return <Line {...config} />;
};

export default LineChart;
