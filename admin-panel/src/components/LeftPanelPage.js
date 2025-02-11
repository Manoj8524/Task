import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Row, Col } from 'antd';
import axios from 'axios';

const LeftPanelPage = () => {
  const [links, setLinks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/links`);
      setLinks(data);
    } catch (error) {
      message.error('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (editingLink) {
        await axios.put(`${API_BASE_URL}/api/links/${editingLink._id}`, values);
        message.success('Link updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/links`, values);
        message.success('Link added successfully');
      }
      fetchLinks();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save link');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/links/${id}`);
      message.success('Link deleted successfully');
      fetchLinks();
    } catch (error) {
      message.error('Failed to delete link');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'URL', dataIndex: 'url', key: 'url' },
    { title: 'Icon (URL)', dataIndex: 'icon', key: 'icon' },
    { title: 'Text Color', dataIndex: 'textColor', key: 'textColor' },
    { title: 'Text Size', dataIndex: 'textSize', key: 'textSize' },
    { title: 'Background Color', dataIndex: 'backgroundColor', key: 'backgroundColor' },
    { title: 'Width', dataIndex: 'width', key: 'width' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingLink(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingLink(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div>
      <h1 style={{ fontSize: 'clamp(20px, 5vw, 36px)', textAlign: 'center' }}>
        Left-Panel Management
      </h1>
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={handleAdd} style={{ marginBottom: 20 }}>
            Add Link
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={links}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={editingLink ? 'Edit Link' : 'Add Link'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width="90%"
        bodyStyle={{ padding: '20px' }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: 'Please enter the URL' }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>
          <Form.Item
            name="icon"
            label="Icon URL"
            rules={[{ required: true, message: 'Please enter the icon URL' }]}
          >
            <Input placeholder="Enter icon URL" />
          </Form.Item>
          <Form.Item
            name="textColor"
            label="Text Color"
          >
            <Input placeholder="Enter text color (e.g., text-gray-300)" />
          </Form.Item>
          <Form.Item
            name="textSize"
            label="Text Size"
          >
            <Input placeholder="Enter text size (e.g., text-base)" />
          </Form.Item>
          <Form.Item
            name="backgroundColor"
            label="Background Color"
          >
            <Input placeholder="Enter background color (e.g., bg-gray-800)" />
          </Form.Item>
          <Form.Item
            name="width"
            label="Width"
          >
            <Input placeholder="Enter width (e.g., w-45)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeftPanelPage;
