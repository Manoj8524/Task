import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdvertisementList = () => {
  const [ads, setAds] = useState([]);
  const [hiddenAds, setHiddenAds] = useState(new Set()); // Track hidden ads
  const [showXMark, setShowXMark] = useState(new Set()); // Track visibility of X mark for each ad

  useEffect(() => {
    // Fetch ads from the backend (GET request) using the environment variable
    const fetchAds = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/ads`; // Use environment variable for base URL
        const response = await axios.get(apiUrl);
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    // Automatically hide ads after 30 seconds
    const hideAdsTimeouts = ads.map((ad) => {
      return setTimeout(() => {
        setHiddenAds((prev) => new Set(prev.add(ad._id))); // Hide ad after 30 seconds
      }, 30000); // 30 seconds
    });

    // Show "X" button after 20 seconds
    const showXMarkTimeouts = ads.map((ad) => {
      return setTimeout(() => {
        setShowXMark((prev) => new Set(prev.add(ad._id))); // Show "X" mark after 20 seconds
      }, 20000); // 20 seconds
    });

    // Clean up timeouts on unmount
    return () => {
      hideAdsTimeouts.forEach((timeout) => clearTimeout(timeout));
      showXMarkTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [ads]);

  const handleHideAd = (adId) => {
    setHiddenAds((prev) => new Set(prev.add(adId))); // Add to hidden ads set
  };

  return (
    <div>
      {ads.map((ad) => {
        // Determine size of the ad
        const adSizeStyle = ad.size === 'large' ? { width: '100%', maxHeight: '600px' } : { width: '300px', maxHeight: '200px' };

        // Determine the type of ad (image, video, gif)
        const adContent = ad.type === 'image' ? (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${ad.src}`} // Use environment variable for the image URL
            alt={ad.title}
            style={{ ...adSizeStyle, borderRadius: '8px' }}
          />
        ) : ad.type === 'video' ? (
          <video
            controls
            style={{ ...adSizeStyle, borderRadius: '8px' }}
          >
            <source src={`${process.env.REACT_APP_API_BASE_URL}/${ad.src}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL}/${ad.src}`} // Use environment variable for the gif URL
            alt={ad.title}
            style={{ ...adSizeStyle, borderRadius: '8px' }}
          />
        );

        // Default position is center
        let adContentPositionStyle = {
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto', // Center content horizontally
        };

        // Override position if specified in backend
        if (ad.position === 'top-left') {
          adContentPositionStyle = { marginTop: '30px', marginLeft: '-900px' };
        } else if (ad.position === 'top-right') {
          adContentPositionStyle = { marginTop: '10px', marginRight: '10px', marginLeft: '10px' };
        } else if (ad.position === 'bottom-left') {
          adContentPositionStyle = { marginBottom: '-10px', marginLeft: '-500px' };
        }

        return (
          !hiddenAds.has(ad._id) && (
            <div
              key={ad._id}
              className="ad-card"
              style={{
                position: 'relative', // Keep this relative for the button's absolute positioning
                marginBottom: '20px',
                width: ad.size === 'large' ? '100%' : '300px', // Ensure large ads fill width
                height: 'auto',
                display: 'flex',
                justifyContent: ad.position ? 'flex-start' : 'center', // Center or start depending on position
              }}
            >
              <div style={adContentPositionStyle}> {/* Apply dynamic content positioning */}
                <div style={{ position: 'relative' }}> {/* Positioning container for the ad content */}
                  {adContent}
                  {/* Close button inside the ad content, positioned at the top right */}
                  {showXMark.has(ad._id) && (
                    <button
                      onClick={() => handleHideAd(ad._id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        padding: '1.5px 2px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10, // Ensure the close button stays on top
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default AdvertisementList;
