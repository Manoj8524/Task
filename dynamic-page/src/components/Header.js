import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/header`);
        setHeaderData(response.data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (loading) {
    return (
      <header className="flex justify-center items-center bg-gray-200 p-4">
        <h1 className="text-gray-600 text-lg font-semibold">Loading Header...</h1>
      </header>
    );
  }

  if (!headerData) {
    return (
      <header className="flex justify-center items-center bg-red-200 p-4">
        <h1 className="text-gray-600 text-lg font-semibold">Header Not Found</h1>
      </header>
    );
  }

  const {
    text = "Default Header Text",
    textColor = "#000",
    textSize = "24px",
    backgroundColor = "#fff",
    height = "60px",
    logo = "", 
  } = headerData;

  return (
    <header
      style={{
        backgroundColor,
        color: textColor,
        height,
      }}
      className="flex justify-between items-center px-4 shadow-md"
    >
      
      <div className="ml-6">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "gray",
            }}
            className="flex justify-center items-center text-white"
          >
            No Logo
          </div>
        )}
      </div>

    
      <h1
        style={{
          fontSize: textSize,
          color: textColor,
        }}
        className="text-center font-bold flex-1"
      >
        {text}
      </h1>
    </header>
  );
};

export default Header;
