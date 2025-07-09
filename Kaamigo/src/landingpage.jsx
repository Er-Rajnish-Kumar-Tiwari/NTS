// LandingPage.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { FiLogOut } from 'react-icons/fi';

// Dynamic styling for active nav links
const navLinkClass = ({ isActive }) =>
  `py-2 px-2 sm:px-3 rounded transition-colors duration-300 font-medium text-sm sm:text-base ${
    isActive
      ? 'text-purple-700 border-b-2 sm:border-b-4 border-purple-500 '
      : 'hover:text-orange-500 hover:bg-orange-50 text-gray-800'
  }`;

// Navbar Component
const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 border-b shadow-sm bg-indigo-50 transition-all duration-300 text-sm sm:text-base">
      <NavLink to="/" className="text-xl sm:text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors duration-300 cursor-pointer">
        Kaamigo
      </NavLink>

      {/* Only show nav links on desktop */}
      <div className="hidden lg:flex flex-wrap gap-x-2 text-sm sm:text-base font-medium min-w-0 overflow-hidden">
        <NavLink to="/" className={navLinkClass} end>Home</NavLink>
        <NavLink to="/explore" className={navLinkClass}>Explore</NavLink>
        <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
        <NavLink to="/partners" className={navLinkClass}>Partners</NavLink>
        <NavLink to="/coins" className={navLinkClass}>Coins</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
        <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 mt-3 sm:mt-0">
        {!isSignedIn ? (
          <>
            <NavLink to="/login" className="text-sm sm:text-base font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300 py-1 sm:py-2 px-3 sm:px-4 rounded hover:bg-orange-50">
              Login
            </NavLink>
            <NavLink to="/sign" className="bg-purple-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow">
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <div className="text-sm sm:text-base font-medium text-purple-700 hover:text-orange-500 transition-colors duration-300 py-1 px-2 sm:py-2 sm:px-4 rounded hover:bg-orange-50">
              Hi, {user?.firstName || 'User'}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors duration-300 text-sm font-medium"
            >
              <FiLogOut className="text-base sm:text-lg" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 text-sm sm:text-base">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-100 to-orange-50 py-16 sm:py-24 text-center px-4 sm:px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 animate-pulse">
          Reels Bhi. Rozgaar Bhi.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          Your voice-first, reels-powered platform connecting talent with opportunities in Tier 2/3 India.
        </p>

        <div className="flex flex-col sm:flex-row justify-center mb-8 max-w-md sm:max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for gigs or workers..."
            className="w-full px-4 sm:px-6 py-3 border-2 border-purple-200 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:border-purple-500 transition-colors duration-300 text-sm sm:text-lg"
          />
          <button className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow">
            Search
          </button>
        </div>

        <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
          <button className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow">
            📥 Download the App
          </button>
          <button className="border-2 border-purple-600 text-purple-700 px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow">
            Join as a Freelancer / Client
          </button>
        </div>
      </div>

      {/* Benefits, Reels, Testimonials, App Download, Footer Sections */}
      <section className="py-12 px-4 sm:px-6 md:px-12 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">Why Kaamigo? Benefits for Everyone</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow hover:shadow-lg transition">
              <div className="text-3xl mb-4">{['👤','💼','🎤','🎥','📈','🪙'][idx]}</div>
              <h3 className="font-semibold text-purple-700 text-lg mb-2">{['Verified Talent','Quick Hiring','Voice-First Communication','Showcase Reels','Flexible Work','Tier 2/3 Focus'][idx]}</h3>
              <p className="text-gray-600 text-sm">{["Access a curated pool of skilled freelancers from Tier 2/3 India.","Post gigs, review applications, and hire talent efficiently.","Connect using voice notes and calls to bridge language gaps.","Freelancers can showcase skills through short, engaging reels.","Discover projects, set terms, and earn better pay.","Tap into a client base in emerging cities for better income."][idx]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-orange-50 to-purple-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">See Skills in Action: Top Reels</h2>
        <div className="flex overflow-x-auto gap-4 sm:gap-6 max-w-6xl mx-auto px-1 pb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[250px] bg-white border border-orange-200 rounded-xl shadow hover:shadow-xl transition p-4">
              <div className="h-32 bg-orange-100 rounded mb-3"></div>
              <h3 className="text-purple-700 font-semibold text-sm">Reel Title #{i}</h3>
              <p className="text-gray-500 text-xs">By Freelancer #{i}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 md:px-12 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-purple-50 border border-purple-200 p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm italic text-gray-700 mb-4">"Kaamigo made it easier for me to find work without the stress!"</p>
              <h4 className="font-semibold text-purple-700 text-sm">User #{i}</h4>
              <span className="text-xs text-orange-500">Freelancer</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-orange-100 to-purple-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-700">Get the Kaamigo App Today!</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Experience voice-first freelancing on the go. Download the app for seamless connections.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition">📱 Android</button>
              <button className="border border-purple-600 text-purple-700 px-6 py-3 rounded hover:bg-purple-100 transition">🍏 iOS (Coming Soon)</button>
            </div>
          </div>
          <div className="md:w-1/3 h-48 w-full bg-purple-200 rounded-xl shadow-inner"></div>
        </div>
      </section>

      <footer className="bg-white text-center py-6 border-t text-xs text-gray-600">
        © {new Date().getFullYear()} Kaamigo. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
export { Navbar };
