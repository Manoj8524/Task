import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Button } from 'antd';

const HomeMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/content`;
        const response = await axios.get(apiUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Feature',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <span className="text-sm md:text-base lg:text-lg font-medium">{text}</span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <span className="text-sm md:text-base lg:text-lg text-gray-600">{text}</span>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="Feature"
          className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-cover rounded"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="primary" className="text-sm md:text-base">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <main className="flex-1 p-4 md:p-6 bg-white shadow-lg rounded-lg mx-2 md:mx-4 lg:mx-6">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
        Welcome to the Dynamic Page
      </h2>
      <div className="text-center text-gray-600 text-sm md:text-base mb-6">
        Explore the features and content below.
      </div>

      <section className="mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-3">
          Feature Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features &&
            data.features.map((feature, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <img
                    alt={feature.title}
                    src={feature.image}
                    className="h-32 md:h-48 lg:h-64 object-cover"
                  />
                }
                className="shadow-md"
              >
                <Card.Meta
                  title={
                    <span className="text-sm md:text-base lg:text-lg font-bold">
                      {feature.title}
                    </span>
                  }
                  description={
                    <span className="text-xs md:text-sm lg:text-base text-gray-600">
                      {feature.description}
                    </span>
                  }
                />
              </Card>
            ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-700 mb-3">
          Feature Details
        </h3>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data.features}
          rowKey="title"
          pagination={{ pageSize: 5 }}
          scroll={{ x: '100%' }} 
          className="text-sm md:text-base"
        />
      </section>
    </main>
  );
};

export default HomeMain;
