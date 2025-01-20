import React, { useState, useEffect } from "react";
import axios from "axios";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchServices = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/services`;
      const response = await axios.get(apiUrl);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <p className="text-gray-900 font-semibold">Price: ${service.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
