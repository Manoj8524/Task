import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const LeftPanel = () => (
  <div style={{ width: 200, height: '100vh', backgroundColor: '#001529' }}>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/left-panel">Left Panel</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/footer">Footer Configuration</Link>
      </Menu.Item>
      <Menu.Item key="3"> {/* Add this item for the Header configuration */}
        <Link to="/header">Header Configuration</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/advertisement">Advertisement Management</Link> {/* Link to Advertisement Page */}
      </Menu.Item>
    </Menu>
  </div>
);

export default LeftPanel;
