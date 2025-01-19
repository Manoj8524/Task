import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvertisementList = () => {
  const [ads, setAds] = useState([]);
  const [hiddenAds, setHiddenAds] = useState(new Set()); // Track hidden ads

  useEffect(() => {
    // Fetch ads from the backend (GET request)
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, []);

  const handleHideAd = (adId) => {
    setHiddenAds((prev) => new Set(prev.add(adId))); // Add to hidden ads set
  };

  return (
    <div>
      {ads.map((ad) => (
        !hiddenAds.has(ad._id) && (
          <div key={ad._id} className="ad-card" style={{ position: 'relative', marginBottom: '20px' }}>
            <h3>{ad.title}</h3>
            <img src={`http://localhost:5000/${ad.src}`} alt={ad.title} style={{ width: '100%', borderRadius: '8px' }} />
            <p>{ad.description}</p>

            {/* Close button */}
            <button
              onClick={() => handleHideAd(ad._id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
        )
      ))}
    </div>
  );
};

export default AdvertisementList;
