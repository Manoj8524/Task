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

  // Fetch all ads
  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/ads`);
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
      message.error('Failed to fetch ads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Handle ad editing
  const handleEdit = (ad) => {
    setAdToEdit(ad);
    form.setFieldsValue(ad); // Set form fields to ad values
    setIsModalVisible(true); // Open the modal
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/ads/${id}`);
      fetchAds(); // Refresh ads list after deletion
      message.success('Ad deleted successfully');
    } catch (error) {
      console.error('Error deleting ad:', error);
      message.error('Failed to delete ad');
    }
  };

  // Handle ad creation/update (POST/PUT)
  const handleSubmit = async (values) => {
    try {
      if (adToEdit) {
        // Update ad
        await axios.put(`${API_BASE_URL}/ads/${adToEdit._id}`, values);
        message.success('Ad updated successfully');
      } else {
        // Create new ad
        await axios.post(`${API_BASE_URL}/ads`, values);
        message.success('Ad created successfully');
      }
      fetchAds(); // Refresh the list after submit
      setIsModalVisible(false); // Close the modal
      setAdToEdit(null); // Reset editing state
    } catch (error) {
      console.error('Error saving ad:', error);
      message.error('Failed to save ad');
    }
  };

  // Table columns
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
          <Button type="danger" onClick={() => handleDelete(record._id)} style={{ marginLeft: '10px' }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Advertisement Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: '20px' }}
      >
        Add New Ad
      </Button>

      <Table
        columns={columns}
        dataSource={ads}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal for creating/editing an ad */}
      <Modal
        title={adToEdit ? 'Edit Ad' : 'Add New Ad'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the ad title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the ad description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the ad type!' }]}
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
            rules={[{ required: true, message: 'Please select the ad size!' }]}
          >
            <Select>
              <Select.Option value="large">Large</Select.Option>
              <Select.Option value="small">Small</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please select the ad position!' }]}
          >
            <Select>
              <Select.Option value="top-right">Top Right</Select.Option>
              <Select.Option value="bottom-left">Bottom Left</Select.Option>
              <Select.Option value="top-left">Top Left</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={({ file }) => (file ? [file] : [])}
          >
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              accept="image/*,video/*,gif/*"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              onClick={() => setIsModalVisible(false)}
              style={{ marginRight: '10px' }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {adToEdit ? 'Update Ad' : 'Add Ad'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdvertisementPage;
