import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Row, Col } from 'antd';
import axios from 'axios';

const FooterPage = () => {
  const [footer, setFooter] = useState(null);
  const [isFooterModalVisible, setIsFooterModalVisible] = useState(false);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const [editingIcon, setEditingIcon] = useState(null);
  const [form] = Form.useForm();
  const [iconForm] = Form.useForm();

  const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

  
  const fetchFooter = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/footer`);
      setFooter(data);
    } catch (error) {
      message.error('Failed to fetch footer');
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

 
  const handleFooterSubmit = async (values) => {
    try {
      if (footer) {
        await axios.put(`${API_BASE_URL}/footer/${footer._id}`, values);
        message.success('Footer updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/footer`, values);
        message.success('Footer added successfully');
      }
      fetchFooter();
      setIsFooterModalVisible(false);
    } catch (error) {
      message.error('Failed to save footer');
    }
  };

 
  const handleIconSubmit = async (values) => {
    try {
      if (editingIcon) {
        const updatedIcons = footer.icons.map((icon) =>
          icon._id === editingIcon._id ? { ...icon, ...values } : icon
        );
        await axios.put(`${API_BASE_URL}/footer/${footer._id}`, { ...footer, icons: updatedIcons });
        message.success('Icon updated successfully');
      } else {
        const updatedIcons = [...footer.icons, values];
        await axios.put(`${API_BASE_URL}/footer/${footer._id}`, { ...footer, icons: updatedIcons });
        message.success('Icon added successfully');
      }
      fetchFooter();
      setIsIconModalVisible(false);
    } catch (error) {
      message.error('Failed to save icon');
    }
  };

  
  const handleDeleteIcon = async (iconId) => {
    try {
      const updatedIcons = footer.icons.filter((icon) => icon._id !== iconId);
      await axios.put(`${API_BASE_URL}/footer/${footer._id}`, { ...footer, icons: updatedIcons });
      message.success('Icon deleted successfully');
      fetchFooter();
    } catch (error) {
      message.error('Failed to delete icon');
    }
  };

  const handleEditFooter = () => {
    form.setFieldsValue(footer);
    setIsFooterModalVisible(true);
  };

  const handleEditIcon = (icon) => {
    setEditingIcon(icon);
    iconForm.setFieldsValue(icon);
    setIsIconModalVisible(true);
  };

  const handleAddIcon = () => {
    setEditingIcon(null);
    iconForm.resetFields();
    setIsIconModalVisible(true);
  };

  const columns = [
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'URL', dataIndex: 'url', key: 'url' },
    { title: 'Color', dataIndex: 'color', key: 'color' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEditIcon(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDeleteIcon(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Footer Management</h1>
      <Row justify="space-between" align="middle" style={{ marginBottom: '1rem' }}>
        <Col>
          <Button type="primary" onClick={handleEditFooter}>
            {footer ? 'Edit Footer' : 'Add Footer'}
          </Button>
        </Col>
        <Col>
          {footer && (
            <Button type="primary" onClick={handleAddIcon}>
              Add Icon
            </Button>
          )}
        </Col>
      </Row>

      {footer && (
        <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <p><strong>Content:</strong> {footer.content}</p>
          <p><strong>Content Color:</strong> {footer.contentColor}</p>
          <p><strong>Content Size:</strong> {footer.contentSize}</p>
          <p><strong>Background Color:</strong> {footer.backgroundColor}</p>
        </div>
      )}

      {footer && (
        <Table
          dataSource={footer.icons}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          style={{ overflowX: 'auto' }}
        />
      )}

    
      <Modal
        title={footer ? 'Edit Footer' : 'Add Footer'}
        visible={isFooterModalVisible}
        onCancel={() => setIsFooterModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFooterSubmit} layout="vertical">
          <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter content' }]}>
            <Input.TextArea placeholder="Enter footer content" />
          </Form.Item>
          <Form.Item name="contentColor" label="Content Color" rules={[{ required: true, message: 'Please enter content color' }]}>
            <Input placeholder="Enter content color" />
          </Form.Item>
          <Form.Item name="contentSize" label="Content Size" rules={[{ required: true, message: 'Please enter content size' }]}>
            <Input placeholder="Enter content size" />
          </Form.Item>
          <Form.Item name="backgroundColor" label="Background Color" rules={[{ required: true, message: 'Please enter background color' }]}>
            <Input placeholder="Enter background color" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingIcon ? 'Edit Icon' : 'Add Icon'}
        visible={isIconModalVisible}
        onCancel={() => setIsIconModalVisible(false)}
        onOk={() => iconForm.submit()}
      >
        <Form form={iconForm} onFinish={handleIconSubmit} layout="vertical">
          <Form.Item name="platform" label="Platform" rules={[{ required: true, message: 'Please enter platform' }]}>
            <Input placeholder="Enter platform" />
          </Form.Item>
          <Form.Item name="url" label="URL" rules={[{ required: true, message: 'Please enter URL' }]}>
            <Input placeholder="Enter URL" />
          </Form.Item>
          <Form.Item name="color" label="Color" rules={[{ required: true, message: 'Please enter color' }]}>
            <Input placeholder="Enter color (e.g., #ffffff)" />
          </Form.Item>
          <Form.Item name="size" label="Size" rules={[{ required: true, message: 'Please enter size' }]}>
            <Input placeholder="Enter size (e.g., 24px)" />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input placeholder="Enter image URL (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FooterPage;
