import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as brandIcons from '@fortawesome/free-brands-svg-icons'; // Import all brand icons

// Add all icons to the library
Object.keys(brandIcons).forEach((key) => {
  if (key.startsWith('fa')) library.add(brandIcons[key]);
});

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/footer');
        setFooterData(response.data);
      } catch (err) {
        console.error('Error fetching footer data:', err);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading footer...</div>;
  }

  return (
    <footer
      style={{ backgroundColor: footerData.backgroundColor }}
      className="py-8 px-4 sm:px-6 md:px-12 lg:px-16"
    >
      <div className="container mx-auto text-center space-y-6">
        {/* Footer Content */}
        <p
          style={{
            color: footerData.contentColor,
            fontSize: footerData.contentSize,
          }}
          className="font-light text-base sm:text-lg md:text-xl"
        >
          {footerData.content}
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center flex-wrap space-x-4 sm:space-x-6">
          {footerData.icons.map((icon, index) => (
            <a
              key={index}
              href={icon.url}
              style={{
                color: icon.color,
                fontSize: icon.size,
              }}
              className="hover:opacity-80 transition duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex justify-center items-center"
            >
              {icon.image ? (
                <img
                  src={icon.image}
                  alt={icon.platform}
                  className="w-full h-full object-contain"
                />
              ) : (
                <FontAwesomeIcon icon={['fab', icon.platform]} />
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
