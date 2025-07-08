import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaVideo, FaBriefcase, FaUserAlt, FaCrown, FaQuestion, FaRocket } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Jobs() {

  const navigate=useNavigate();
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-orange-100 font-[Inter]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-xl p-6 space-y-6 rounded-r-xl">
        <h2 className="text-2xl font-extrabold text-purple-700 tracking-wide cursor-pointer" onClick={()=>navigate("/explore")}>📍 Kaamigo</h2>
        <nav className="space-y-3">
          {[
            { label: "Explore", path: "/explore", icon: <LuLayoutDashboard /> },
            { label: "Reels", path: "/explore/reels", icon: <FaVideo /> },
            { label: "Jobs", path: "/explore/jobs", icon: <FaBriefcase /> },
            { label: "Profile", path: "/explore/profile", icon: <FaUserAlt /> },
            { label: "Features", path: "/explore/features", icon: <FaRocket /> },
            { label: "How it Works", path: "/explore/how-it-works", icon: <FaQuestion /> },
            { label: "Premium", path: "/explore/featurebtn", icon: <FaCrown /> },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-800"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-10 w-full">
        {/* Header and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">Jobs Board</h2>
            <div className="flex flex-wrap gap-2">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500">
                Browse Jobs
              </button>
              <button className="bg-white text-orange-600 px-4 py-2 border border-orange-500 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white">
                Post a Gig
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              placeholder="Search by title or keyword..."
              className="px-4 py-2 border rounded-full w-full lg:w-1/3"
            />
            <div className="flex flex-wrap gap-3 w-full lg:w-2/3">
              <select className="flex-1 min-w-[130px] px-4 py-2 border rounded-lg">
                <option>Category</option>
              </select>
              <select className="flex-1 min-w-[130px] px-4 py-2 border rounded-lg">
                <option>Budget</option>
              </select>
              <select className="flex-1 min-w-[130px] px-4 py-2 border rounded-lg">
                <option>Location</option>
              </select>
              <select className="flex-1 min-w-[130px] px-4 py-2 border rounded-lg bg-gray-50">
                <option>Job Type</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(12)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-lg space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Company Logo"
                      className="w-12 h-12 rounded-full"
                    />
                    <h3 className="font-semibold text-base flex-1 text-gray-800">
                      Job Title #{index + 1}
                    </h3>
                    <p className="text-purple-600 font-bold text-sm whitespace-nowrap">$XX - $YY</p>
                  </div>
                  <p className="text-sm text-orange-500">Contract/Part Time</p>
                  <p className="text-sm text-orange-500">Location: XYZ</p>
                  <p className="text-sm text-gray-700 mt-2">
                    Brief description of the job role and requirements goes here.
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xs text-gray-400">Posted 3 days ago</p>
                  <button className="bg-purple-500 text-white text-sm px-3 py-1 rounded hover:bg-purple-600">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Newsletter Subscribe */}
        <div className="mt-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-violet-200 p-6 rounded-lg text-center shadow space-y-3">
          <h3 className="font-bold text-lg text-purple-700">Kaamigo</h3>
          <p className="text-sm text-gray-600">Stay up to date</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 border rounded-lg sm:rounded-l-lg sm:rounded-r-none"
            />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gradient-to-r from-orange-500 to-yellow-500">
              Subscribe
            </button>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-full shadow hover:bg-gradient-to-r from-orange-400 to-yellow-500 transition duration-300"
        >
          Go Back
        </button>
      </main>
    </div>
  );
}
