import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Button } from 'antd';

const HomeMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API using the environment variable
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/content`; // Use environment variable
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

  // Define columns for the Table
  const columns = [
    {
      title: 'Feature',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Feature" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="primary">View Details</Button>,
    },
  ];

  return (
    <main className="flex-1 p-4 md:p-6 bg-white shadow-lg rounded-lg mx-2 md:mx-4 lg:mx-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
        Welcome to the Dynamic Page
      </h2>
      <div className="text-center text-gray-600 text-sm md:text-base mb-6">
        Explore the features and content below.
      </div>

      {/* Cards for Feature Highlights */}
      <section className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3">Feature Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features &&
            data.features.map((feature, index) => (
              <Card
                key={index}
                hoverable
                cover={<img alt={feature.title} src={feature.image} />}
                className="shadow-md"
              >
                <Card.Meta
                  title={feature.title}
                  description={feature.description}
                />
              </Card>
            ))}
        </div>
      </section>

      {/* Table to display Features */}
      <section className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-3">Feature Details</h3>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data.features}
          rowKey="title"
          pagination={false}
        />
      </section>
    </main>
  );
};

export default HomeMain;
