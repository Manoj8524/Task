import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftPanel from './components/LeftPanel';
import LeftPanelPage from './components/LeftPanelPage';
import FooterPage from './components/FooterPage';
import HeaderPage from './components/HeaderPage';
import AdvertisementPage from './components/AdvertisementPage';  // Add this import

const App = () => (
  <Router>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <LeftPanel />
        <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
          <Routes>
            <Route path="/left-panel" element={<LeftPanelPage />} />
            <Route path="/footer" element={<FooterPage />} />
            <Route path="/header" element={<HeaderPage />} />
            <Route path="/advertisement" element={<AdvertisementPage />} /> {/* New Route */}
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
