import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact");
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No messages found. Check back later!
        </p>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message._id}
              className="bg-white shadow-md rounded-lg p-6 border max-w-4xl mx-auto"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{message.name}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Email:</span> {message.email}
                </p>
              </div>

              <div className="text-left text-gray-800 space-y-2">
                <p>
                  <span className="font-semibold">Subject:</span>{" "}
                  {message.subject}
                </p>
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {message.message}
                </p>
                <p>
                  <span className="font-semibold">Phone Number:</span>{" "}
                  {message.phone || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {message.address || "Not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
