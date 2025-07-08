import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./landingpage.jsx";
import { Navbar } from "./landingpage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import "leaflet/dist/leaflet.css";
import Signup from "./Pages/sign.jsx";
import LoginPage from "./Pages/login.jsx";
import Explore from "./Pages/explore.jsx";
import AboutPage from "./Pages/about.jsx";
import Partners from "./Pages/partners.jsx";
import Coins from "./Pages/coins.jsx";
import ContactUs from "./Pages/contactus.jsx";
import Blog from "./Pages/blog.jsx";
import Jobs from "./Components/job.jsx";
import Reels from "./Components/reels.jsx";
import Profile from "./Components/profile.jsx";
import Features from "./Components/feature.jsx";
import HowItWorks from "./Components/howItWork.jsx";
import FeatureBtn from "./Components/premium.jsx";


// Either use your .env key like this:
const PUBLISHABLE_KEY ="pk_test_b3V0Z29pbmctcGlnbGV0LTY4LmNsZXJrLmFjY291bnRzLmRldiQ";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sign" element={<Signup/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/explore/reels" element={<Reels/>} />
          <Route path="/explore/jobs" element={<Jobs/>} />
          <Route path="/explore/profile" element={<Profile/>} />
          <Route path="/explore/features" element={<Features/>} />
          <Route path="/explore/how-it-works" element={<HowItWorks/>} />
          <Route path="/explore/featurebtn" element={<FeatureBtn/>} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
