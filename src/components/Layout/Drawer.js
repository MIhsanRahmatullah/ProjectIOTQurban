import { FundOutlined,WalletOutlined, LayoutOutlined, MenuOutlined, RightOutlined,  UserOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Button, Drawer, Divider, Row, Col} from 'antd';
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './Drawer.css'

const styleLink = {
  margin: 20,
  color: 'black', 
  fontSize: 20
}

const SideBarDrawer = () => {
  const { Header } = Layout;

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
        <Header 
            className='headerDrawer' 
            style={{ backgroundColor:'darkblue', width: '100%'}}
        >
          <Row justify='space-between' align='top'>
            <Col >
              <Button 
                type="primary" 
                onClick={showDrawer} 
                icon={<MenuOutlined />} 
              />
            </Col>
            <Col span={30}>
              <h1 
               style={{color: 'white', textAlign: 'center', fontSize: 20}}
              >
                Monitoring MBKM
              </h1>
            </Col>
            <Col >
              <Link
                type='promary'
                to={'/login'}
              >
               <UserOutlined/>
              </Link>
            </Col>
          </Row>
          
            <Drawer 
                title="Menu" 
                placement="left" 
                onClose={onClose} 
                visible={visible}
            >
              
              <Link 
                to={'/Home'}
                style={styleLink} 
                onClick={onClose}
              >
                <WalletOutlined /> Home
              </Link>
              <Divider/>
                <Link 
                  to={'/'} 
                  style={styleLink} 
                  onClick={onClose}
                >
                  <LayoutOutlined/> Dashboard
                </Link>
                <Divider />

                <Link 
                  to={'/cattle-data'} 
                  style={styleLink} 
                  onClick={onClose}
                >
                  <DatabaseOutlined /> Cattle Data
                </Link>
                <Divider />

                <Link 
                  to={'/energymonitoring'} 
                  style={styleLink} 
                  onClick={onClose}
                >
                  <FundOutlined/> Energy Monitoring
                </Link>
                <Divider />
                
                <Link 
                  to={'/test'} 
                  style={styleLink} 
                  onClick={onClose}
                >
                  <RightOutlined/> Test
                </Link>
                <Divider />
            </Drawer>
            
        </Header>
    </Layout>
  );
};

export default SideBarDrawer;