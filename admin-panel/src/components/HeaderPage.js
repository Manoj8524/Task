import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Spin, Table, Modal, Space, Popconfirm, Row, Col } from 'antd';
import { SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const HeaderPage = () => {
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHeader, setEditingHeader] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/header`);
      setHeaders(Array.isArray(response.data) ? response.data : [response.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching headers:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/header/${id}`);
      notification.success({ message: 'Header deleted successfully' });
      fetchHeaders();
    } catch (error) {
      console.error('Error deleting header:', error);
      notification.error({ message: 'Failed to delete header' });
    }
  };

  const handleEdit = (header) => {
    setEditingHeader(header);
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingHeader) {
        await axios.put(`${API_BASE_URL}/api/header/${editingHeader._id}`, values);
        notification.success({ message: 'Header updated successfully' });
      } else {
        await axios.post(`${API_BASE_URL}/api/header/add`, values);
        notification.success({ message: 'Header added successfully' });
      }
      setIsModalVisible(false);
      setEditingHeader(null);
      fetchHeaders();
    } catch (error) {
      console.error('Error saving header:', error);
      notification.error({ message: 'Error saving header' });
    }
  };

  const columns = [
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Text Color',
      dataIndex: 'textColor',
      key: 'textColor',
    },
    {
      title: 'Background Color',
      dataIndex: 'backgroundColor',
      key: 'backgroundColor',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this header?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  const containerStyle = {
    padding: '1rem',
    maxWidth: '100%',
  };

  const titleStyle = {
    fontSize: 'calc(1.5rem + 0.5vw)',
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    marginBottom: '20px',
    fontSize: 'calc(0.8rem + 0.2vw)',
  };

  const tableWrapperStyle = {
    overflowX: 'auto',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Header Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={buttonStyle}
      >
        Add New Header
      </Button>
      <div style={tableWrapperStyle}>
        <Table dataSource={headers} columns={columns} rowKey="_id" />
      </div>

      <Modal
        title={editingHeader ? 'Edit Header' : 'Add Header'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingHeader(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingHeader || {}}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Text"
                name="text"
                rules={[{ required: true, message: 'Text is required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Text Color" name="textColor">
                <Input type="color" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Text Size" name="textSize">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Background Color" name="backgroundColor">
                <Input type="color" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Height" name="height">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Logo Image URL" name="logo">
                <Input placeholder="Enter logo image URL" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            block
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default HeaderPage;
