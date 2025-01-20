import React, { useEffect, useState } from 'react';
import { fetchLinks, fetchHeaderData } from '../services/api';
import LeftPanel from '../components/LeftPanel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Advertisement from '../components/Advertisement';
import ErrorBoundary from '../components/ErrorBoundary';
import HomeMain from '../components/HomeMain';

const Home = () => {
  const [links, setLinks] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const fetchedLinks = await fetchLinks();
        setLinks(fetchedLinks);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to load navigation links.");
      }
    };

    loadLinks();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headerData = await fetchHeaderData();
      setData(headerData);
    } catch (err) {
      console.error("Error fetching header data:", err);
      setError("Failed to load header content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100">
        <div className="text-lg font-semibold text-red-600">
          {error}. Please try again later.
        </div>
      </div>
    );
  }

  if (!data && loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <title>Dynamic Page - Welcome</title>

      <div className="flex-1 flex flex-col lg:flex-row "> 
        
      
        <div className="fixed top-0 left-0 h-screen  shadow-md z-10">
          <LeftPanel links={links} />
        </div>

       
        <div className="flex-1 flex flex-col ml-1/4"> 


        <div className="absolute top-0 right-0 p-4 z-10">
            <Advertisement />
          </div>
          
        
          <ErrorBoundary>
            <Header headerData={data} />
          </ErrorBoundary>

          {data?.ads?.length > 0 && (
            <section className="p-4">
              <Advertisement ads={data.ads} />
            </section>
          )}

          <div className="flex-1 flex flex-col">
            <HomeMain data={data} />
          </div>

        
          <footer className="bg-gray-900 text-white text-center py-3 text-sm md:text-base">
            <Footer footerContent={data?.footerContent} />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
