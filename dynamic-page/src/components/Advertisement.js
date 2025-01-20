import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvertisementList = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0); 
  const [showXMark, setShowXMark] = useState(false); 
  const [isMuted, setIsMuted] = useState(true); 

  useEffect(() => {
   
    const fetchAds = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/ads`; 
        const response = await axios.get(apiUrl);
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    
    const showXTimeout = setTimeout(() => {
      setShowXMark(true);
    }, 10000); 

    
    const hideAdTimeout = setTimeout(() => {
      setShowXMark(false); 
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); 
    }, 30000); 

    return () => {
      clearTimeout(showXTimeout);
      clearTimeout(hideAdTimeout);
    };
  }, [ads, currentAdIndex]);

  const handleHideAd = () => {
    setShowXMark(false); 
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); 
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentAd = ads[currentAdIndex]; 

  return (
    <div>
      {currentAd && (
        <div
          key={currentAd._id}
          className="ad-card"
          style={{
            position: 'relative', 
            marginBottom: '20px',
            width: currentAd.size === 'large' ? '100%' : '300px', 
            height: 'auto',
            display: 'flex',
            justifyContent: currentAd.position ? 'flex-start' : 'center', 
          }}
        >
          
          <div
            style={{
              display: 'block',
              marginLeft:
                currentAd.position === 'top-left'
                  ? '-900px'
                  : currentAd.position === 'bottom-left'
                  ? '-500px'
                  : 'auto',
              marginRight: currentAd.position === 'top-right' ? '10px' : 'auto',
              marginTop: currentAd.position === 'top-right' ? '10px' : '30px',
              marginBottom: currentAd.position === 'bottom-left' ? '-10px' : '0',
              position: 'relative', 
            }}
          >
           
            {currentAd.type === 'image' ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${currentAd.src}`}
                alt={currentAd.title}
                style={{
                  width: currentAd.size === 'large' ? '100%' : '300px',
                  maxHeight: currentAd.size === 'large' ? '600px' : '200px',
                  borderRadius: '8px',
                }}
              />
            ) : currentAd.type === 'video' ? (
              <div style={{ position: 'relative' }}>
                <video
                  autoPlay
                  muted={isMuted}
                  loop
                  style={{
                    width: currentAd.size === 'large' ? '100%' : '300px',
                    maxHeight: currentAd.size === 'large' ? '600px' : '200px',
                    borderRadius: '8px',
                  }}
                >
                  <source
                    src={`${process.env.REACT_APP_API_BASE_URL}/${currentAd.src}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={toggleMute}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            ) : (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${currentAd.src}`}
                alt={currentAd.title}
                style={{
                  width: currentAd.size === 'large' ? '100%' : '300px',
                  maxHeight: currentAd.size === 'large' ? '600px' : '200px',
                  borderRadius: '8px',
                }}
              />
            )}

            
            {showXMark && (
              <button
                onClick={handleHideAd}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 10, 
                }}
              >
                X
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementList;
