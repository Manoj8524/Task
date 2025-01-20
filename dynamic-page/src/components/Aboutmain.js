import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/about`;

   
    axios
      .get(apiUrl)
      .then((response) => {
        setAboutData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching About page data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!aboutData) {
    return (
      <div className="text-center text-red-600">
        Error: Unable to fetch About page content.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{aboutData.mission}</h1>
      <p className="text-gray-700 text-center mb-8">{aboutData.overview}</p>

    
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutData.team.map((member, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-lg text-center"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 mx-auto mb-3 rounded-full object-cover"
              />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside">
          {aboutData.values.map((value, index) => (
            <li key={index} className="text-gray-700">
              {value}
            </li>
          ))}
        </ul>
      </section>

     
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">{aboutData.contact}</p>
      </section>
    </div>
  );
};

export default AboutPage;
