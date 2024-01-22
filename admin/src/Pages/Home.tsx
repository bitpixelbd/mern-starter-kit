/* eslint-disable prettier/prettier */
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;

const Home = () => {
    return (
        <>
            <Card bordered={false}>
                <Space wrap>
                    <Title level={2}>Welcome</Title>
                </Space>
            </Card>
        </>
    );
};

export default Home;
