import React, { useState, useEffect } from 'react';
import { Col, Divider, Layout, Row, Typography, Card, Select } from 'antd';
import EnergyBar from '../../components/bar/batteryLevel';
import "antd/dist/antd.css"
import LevelCharts from '../../components/charts/LevelCharts';
import './Dashboard.css'


const {  Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const style = {
  background: '#0092ff',
  padding: '8px 0',
};


function EnergyMonitoringPage() {

    const [boardName, setBoardName] = useState("");

        const onChange = (value) => {
            setBoardName(value);
        };

        useEffect(() => {
            onChange();
        }, [])

  return (
    <>
      {/* <Divider orientation='center'>Energy Monitoring</Divider>
      <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
      }}
      justify="center" align="middle" >
        <Col flex="100px" >
            <EnergyBar></EnergyBar>
        </Col>
        <Col flex="auto">
            <EnergyBar></EnergyBar>
        </Col>
        </Row> */}
        <Layout
            className='LEM'>
                {/* <Header className="header">
                    <Title level={3} style={{color:'white'}}>Monitoring MBKM</Title>
                </Header> */}
                <Content style={{ padding:24, margin:0 }}>
                    <Row justify='space-between'>
                        <Col span={14}>
                                    <Typography level={4}>Selected Device: {boardName}</Typography>
                                </Col>
                                <Col span={10}>
                                        <Select
                                        placement='topRight'
                                        showSearch
                                        placeholder="Select a Device"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        // onSearch={onSearch}
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                        style={{
                                            width: '100%',
                                        }}
                                        >
                                        <Option value="Board_1">Board 1</Option>
                                        <Option value="Board_2">Board 2</Option>
                                        <Option value="Board_3">Board 3</Option>
                                        </Select>
                        </Col>
                        <Col span={24}>
                            <Card title="Battery Level" bordered={false}>
                                <EnergyBar></EnergyBar>
                            </Card>
                        </Col>
                        <Divider/>
                        <Col span={24}>
                            <Card title="Battery Usage Chart" bordered={false}>
                                <LevelCharts></LevelCharts>
                                <Card type="inner" title="Battery Ussage Details" extra={<a href="#">More</a>}>
                                    <Typography>Capacity: 16.000 mAh</Typography>
                                    <Typography>Operating Hour: 4 Hours 43 Min 23 s</Typography>
                                 </Card>
                            </Card>
                        </Col>
                    </Row>
                </Content>
{/* 
                <Footer>Footer</Footer> */}
        </Layout>
    </>
  );
}

export default EnergyMonitoringPage;
