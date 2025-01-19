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

  // Fetch all ads
  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/ads');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
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
      await axios.delete(`http://localhost:5000/ads/${id}`);
      fetchAds(); // Refresh ads list after deletion
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  // Handle ad creation/update (POST/PUT)
  const handleSubmit = async (values) => {
    try {
      if (adToEdit) {
        // Update ad
        await axios.put(`http://localhost:5000/ads/${adToEdit._id}`, values);
      } else {
        // Create new ad
        await axios.post('http://localhost:5000/ads', values);
      }
      fetchAds(); // Refresh the list after submit
      setIsModalVisible(false); // Close the modal
      message.success('Ad successfully saved!');
      setAdToEdit(null); // Reset editing state
    } catch (error) {
      message.error('Error saving ad');
      console.error(error);
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
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Advertisement Management</h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="mb-4"
      >
        Add New Ad
      </Button>

      <Table
        columns={columns}
        dataSource={ads}
        rowKey="_id"
        loading={loading}
        pagination={false}
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

          <Form.Item className="flex justify-end">
            <Button
              type="default"
              onClick={() => setIsModalVisible(false)}
              className="mr-2"
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
