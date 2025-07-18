// LandingPage.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Logo from "./logo.png";

// Dynamic styling for active nav links
const navLinkClass = ({ isActive }) =>
  `py-2 px-2 sm:px-3 rounded transition-colors duration-300 font-medium text-sm sm:text-base ${
    isActive
      ? "text-purple-700 border-b-2 sm:border-b-4 border-purple-500"
      : "hover:text-purple-500 text-gray-800"
  }`;

// Navbar Component
const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-4 sm:px-6 py-1  border-b shadow-sm bg-indigo-300 transition-all duration-300 text-sm sm:text-base">
      <NavLink
        to="/"
        className="text-xl sm:text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors duration-300 cursor-pointer"
      >
        <img src={Logo} alt="" className=" lg:w-22 md:w-20 w-18"/>
      </NavLink>

      <div className="hidden lg:flex flex-wrap gap-x-2">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/explore" className={navLinkClass}>
          Explore
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About Us
        </NavLink>
        <NavLink to="/partners" className={navLinkClass}>
          Partners
        </NavLink>
        <NavLink to="/coins" className={navLinkClass}>
          Coins
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact Us
        </NavLink>
        <NavLink to="/blog" className={navLinkClass}>
          Blog
        </NavLink>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 mt-3 sm:mt-0">
        {!isSignedIn ? (
          <>
            <NavLink
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-1 px-3 rounded hover:bg-orange-50"
            >
              Login
            </NavLink>
            <NavLink
              to="/sign"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow"
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <div className="text-sm font-medium text-purple-700 hover:text-orange-500 py-1 px-2 rounded hover:bg-orange-50">
              Hi, {user?.firstName || "User"}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              <FiLogOut className="text-lg" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Landing Page
const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);
  const headingText = "Reels Bhi. Rozgaar Bhi.".split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
      rotate: -10,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening && transcript) {
      setSearchInput(transcript);
    }
  }, [transcript, listening]);

  const toggleListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsMicActive(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      setIsMicActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 text-gray-800 text-sm sm:text-base">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-400 via-purple-300 to-orange-300 py-16 sm:py-24 text-center px-4 sm:px-6 md:px-12">
        <motion.h1
          className="text-center text-3xl md:text-5xl font-extrabold mb-6 px-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-orange-600 to-orange-500 w-full inline-block"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {headingText.map((char, i) => (
            <motion.span
              key={i}
              variants={item}
              whileHover={{
                scale: 1.3,
                color: "#ea580c",
                textShadow: "0px 0px 12px rgba(250, 204, 21, 0.8)",
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Your voice-first, reels-powered platform connecting talent with
          opportunities in Tier 2/3 India.
        </p>

        {/* Search bar with mic */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch max-w-xl mx-auto mb-10 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for gigs or workers..."
            className="w-full px-5 py-3 border-2 border-purple-500 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
          />
          <button
            onClick={toggleListening}
            className={`absolute lg:right-30 md:right-30 right-3 top-[18px] sm:top-[16px] text-xl cursor-pointer ${
              isMicActive ? "text-red-500" : "text-gray-500"
            } hover:text-purple-700 transition-colors`}
          >
            {isMicActive ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-purple-700 transition-all transform hover:scale-105 shadow">
            Search
          </button>
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 shadow">
            📥 Download the App
          </button>
          <button className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-100 transition transform hover:scale-105 shadow">
            Join as a Freelancer / Client
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-gradient-to-t from-purple-300 via-violet-200 to-indigo-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Kaamigo? Benefits for Everyone
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            [
              "👤",
              "Verified Talent",
              "Access skilled freelancers from Tier 2/3 India.",
            ],
            [
              "💼",
              "Quick Hiring",
              "Post gigs, review applications, and hire efficiently.",
            ],
            [
              "🎤",
              "Voice Communication",
              "Bridge language gaps with voice notes & calls.",
            ],
            [
              "🎥",
              "Showcase Reels",
              "Display skills via short, powerful videos.",
            ],
            [
              "📈",
              "Flexible Work",
              "Choose projects, set terms, and earn better.",
            ],
            [
              "🪙",
              "Tier 2/3 Focus",
              "Get matched with nearby clients or workers.",
            ],
          ].map(([emoji, title, desc], idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white shadow hover:shadow-md transition border border-purple-200"
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reels Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-200 to-purple-300">
        <h2 className="text-3xl font-bold text-center mb-10">
          See Skills in Action: Top Reels
        </h2>
        <div className="flex overflow-x-auto gap-6 max-w-6xl mx-auto px-1 pb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white border border-orange-200 rounded-xl shadow hover:shadow-xl transition p-4"
            >
              <div className="h-32 bg-orange-100 rounded mb-3"></div>
              <h3 className="text-purple-700 font-semibold text-sm">
                Reel Title #{i}
              </h3>
              <p className="text-gray-500 text-xs">By Freelancer #{i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-purple-200">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-purple-50 border border-purple-200 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="text-sm italic text-gray-700 mb-4">
                "Kaamigo made it easier for me to find work without the stress!"
              </p>
              <h4 className="font-semibold text-purple-700 text-sm">
                User #{i}
              </h4>
              <span className="text-xs text-orange-500">Freelancer</span>
            </div>
          ))}
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-300 to-orange-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-purple-700">
              Get the Kaamigo App Today!
            </h2>
            <p className="text-base text-gray-700 mb-6">
              Experience voice-first freelancing on the go. Download the app for
              seamless connections.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition">
                📱 Android
              </button>
              <button className="border border-purple-600 text-purple-700 px-6 py-3 rounded hover:bg-purple-100 transition">
                🍏 iOS (Coming Soon)
              </button>
            </div>
          </div>
          <div className="md:w-1/3 h-48 w-full bg-purple-200 rounded-xl shadow-inner"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181B23] py-10 text-center text-gray-300 mt-16 animate-fade-in">
        <div className="text-3xl font-bold text-purple-400 mb-2">Kaamigo</div>
        <div className="mb-2 text-base">
          Connecting talent with opportunities through voice-first innovation
        </div>
        <div className="text-xs text-gray-500">
          © 2025 Kaamigo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
export { Navbar };
