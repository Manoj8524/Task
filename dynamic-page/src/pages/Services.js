import React from 'react';
import LeftPanel from '../components/LeftPanel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Advertisement from '../components/Advertisement';
import ErrorBoundary from '../components/ErrorBoundary';
import Main from '../components/ServiceMain';

const Services = () =>  {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
 
      <div className="flex-1 flex flex-col lg:flex-row">
       
        <div className="fixed top-0 left-0 h-screen  shadow-md z-10">
          <LeftPanel  />
        </div>

       
        <div className="flex-1 flex flex-col">


        <div className="absolute top-0 right-0 p-4 z-10">
            <Advertisement />
          </div>
         
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>

          <Main />

          <footer className="bg-gray-900 text-white text-center py-3 text-sm md:text-base">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};


export default Services;
