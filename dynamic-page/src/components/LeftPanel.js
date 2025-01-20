import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LeftPanel = () => {
  const [links, setLinks] = useState([]);
  const [expanded, setExpanded] = useState(false);

 
  const fetchLinks = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/links`; 
      const response = await axios.get(apiUrl);
      setLinks(response.data); 
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="relative">
     
      <div
        className={`${
          expanded ? "w-40" : "w-0"
        } min-h-screen fixed top-0 left-0 bg-gray-800 text-white overflow-hidden transition-all duration-300 ease-in-out`}
      >
        
        <ul className={`space-y-4 mt-16 ${expanded ? "" : "hidden"}`}>
          {links && links.length > 0 ? (
            links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700"
                >
                  {link.icon && (
                    <img
                      src={link.icon}
                      alt="icon"
                      className="w-6 h-6"
                    />
                  )}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-center">No links available</li>
          )}
        </ul>
      </div>

    
      <div
        className={`absolute top-2 left-2 p-2 cursor-pointer z-20 bg-gray-800 rounded-full text-white`}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xl">{expanded ? "<" : ">"}</span>
      </div>
    </div>
  );
};

export default LeftPanel;
