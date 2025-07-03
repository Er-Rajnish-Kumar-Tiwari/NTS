import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import LandingPage from './landingpage.jsx'
import ContactUs from './contactus.jsx'
import Coins from './coins.jsx'
import Partners from './partners.jsx'
import { Navbar } from './landingpage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
