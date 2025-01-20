import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AdvertisementPage = () => {
  const [ads, setAds] = useState([]);
  const [adToEdit, setAdToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/ads`);
      setAds(response.data);
    } catch (error) {
      message.error('Failed to fetch advertisements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleEdit = (ad) => {
    setAdToEdit(ad);
    form.setFieldsValue(ad);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/ads/${id}`);
      fetchAds();
      message.success('Ad deleted successfully.');
    } catch (error) {
      message.error('Failed to delete advertisement.');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('type', values.type);
      formData.append('size', values.size);
      formData.append('position', values.position);

      if (values.file && values.file.file) {
        formData.append('file', values.file.file);
      }

      if (adToEdit) {
        await axios.put(`${API_BASE_URL}/ads/${adToEdit._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Advertisement updated successfully.');
      } else {
        await axios.post(`${API_BASE_URL}/ads`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Advertisement created successfully.');
      }
      fetchAds();
      setIsModalVisible(false);
      setAdToEdit(null);
    } catch (error) {
      message.error('Failed to save advertisement.');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)} style={{ marginLeft: 10 }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Advertisement Management</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 20 }}>
        Add New Advertisement
      </Button>
      <Table
        columns={columns}
        dataSource={ads}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ overflowX: 'auto' }}
      />

      
      <Modal
        title={adToEdit ? 'Edit Advertisement' : 'Add New Advertisement'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the advertisement title.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description.' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the type.' }]}
          >
            <Select>
              <Select.Option value="image">Image</Select.Option>
              <Select.Option value="video">Video</Select.Option>
              <Select.Option value="gif">GIF</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please select the size.' }]}
          >
            <Select>
              <Select.Option value="large">Large</Select.Option>
              <Select.Option value="small">Small</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please select the position.' }]}
          >
            <Select>
              <Select.Option value="top-right">Top Right</Select.Option>
              <Select.Option value="bottom-left">Bottom Left</Select.Option>
              <Select.Option value="top-left">Top Left</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Upload" name="file">
            <Upload beforeUpload={() => false} accept="image/*,video/*,.gif">
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="default" onClick={() => setIsModalVisible(false)} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {adToEdit ? 'Update Advertisement' : 'Add Advertisement'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdvertisementPage;
