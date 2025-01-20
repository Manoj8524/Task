import React, { useState } from 'react';
import { Drawer, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

const LeftPanel = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <div>
     
      <Button
        className="menu-toggle"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{
          display: 'block',
          margin: '16px',
          fontSize: '24px',
          backgroundColor: '#001529',
          color: '#fff',
          border: 'none',
        }}
      />
      
     
      <Drawer
        title="Admin Panel"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={250}
        style={{ zIndex: 1000 }}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/left-panel">Left Panel</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/footer">Footer Configuration</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/header">Header Configuration</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/advertisement">Advertisement Management</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Menu for larger screens */}
      {/* <div className="desktop-menu">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 200, height: '100vh', position: 'fixed', left: 0 }}
        >
          <Menu.Item key="1">
            <Link to="/left-panel">Left Panel</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/footer">Footer Configuration</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/header">Header Configuration</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/advertisement">Advertisement Management</Link>
          </Menu.Item>
        </Menu>
      </div> */}

  
    </div>
  );
};

export default LeftPanel;
