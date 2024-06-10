import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const ContentArea = () => (
    <Content className="p-4">
        <div className="bg-white p-4 min-h-full shadow-sm rounded-lg">
            Main Content Area
        </div>
    </Content>
);

export default ContentArea;
