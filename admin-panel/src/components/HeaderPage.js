import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const HeaderPage = () => {
  const [header, setHeader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/header');
        setHeader(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching header:', error);
        setLoading(false);
      }
    };
    fetchHeader();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/header/add', values);
      notification.success({ message: 'Header saved successfully' });
    } catch (error) {
      console.error('Error saving header:', error);
      notification.error({ message: 'Error saving header' });
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="p-4">
      <h2>Header Configuration</h2>
      <Form
        layout="vertical"
        initialValues={{
          text: header?.text || '',
          textColor: header?.textColor || '#000000',
          textSize: header?.textSize || '16px',
          backgroundColor: header?.backgroundColor || '#ffffff',
          height: header?.height || '60px',
          logo: header?.logo || '',
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Text" name="text" rules={[{ required: true, message: 'Text is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Text Color" name="textColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="Text Size" name="textSize">
          <Input />
        </Form.Item>
        <Form.Item label="Background Color" name="backgroundColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="Height" name="height">
          <Input />
        </Form.Item>
        <Form.Item label="Logo Image URL" name="logo">
          <Input placeholder="Enter logo image URL" />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default HeaderPage;
