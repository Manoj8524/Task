import React, { useState } from 'react';
import axios from 'axios';

const AdvertisementForm = ({ adToEdit, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(adToEdit ? adToEdit.title : '');
  const [description, setDescription] = useState(adToEdit ? adToEdit.description : '');
  const [type, setType] = useState(adToEdit ? adToEdit.type : 'image');
  const [size, setSize] = useState(adToEdit ? adToEdit.size : 'large');
  const [position, setPosition] = useState(adToEdit ? adToEdit.position : 'top-right');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('size', size);
    formData.append('position', position);

    try {
      if (adToEdit) {
        // If editing an ad, use PUT request
        await axios.put(`http://localhost:5000/ads/${adToEdit._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Otherwise, create a new ad using POST request
        await axios.post('http://localhost:5000/ads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onSuccess(); // Call the parent callback to refresh the ad list
    } catch (error) {
      console.error('Error saving ad:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ad Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Ad Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="gif">GIF</option>
      </select>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="large">Large</option>
        <option value="small">Small</option>
      </select>
      <select value={position} onChange={(e) => setPosition(e.target.value)}>
        <option value="top-right">Top Right</option>
        <option value="bottom-left">Bottom Left</option>
        <option value="top-left">Top Left</option>
      </select>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">{adToEdit ? 'Update Ad' : 'Create Ad'}</button>
    </form>
  );
};

export default AdvertisementForm;
