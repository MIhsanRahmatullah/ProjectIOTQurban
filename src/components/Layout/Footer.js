import React from 'react';
import { Layout } from 'antd';

const Footer = () => {
  const { Footer } = Layout;

  return (
    <Layout>
        <Footer 
            style={{ 
                textAlign: 'center',
                backgroundColor: '#fff',
                fontWeight: 'bold', 
                display: 'float'
            }}>
            ©QURBAN 2022
        </Footer>
      
    </Layout>
  );
};

export default Footer;