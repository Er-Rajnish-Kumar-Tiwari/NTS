import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaMapMarkerAlt, FaCoins, FaGift, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [manualCityInput, setManualCityInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);

  const [profileData, setProfileData] = useState({
    name: "Ramesh Kumar",
    skill: "Electrician",
    rating: "4.7",
    phone: "9876543210",
    email: "ramesh@example.com",
    experience: "5 years",
    age: 30,
    location: "Patna, Bihar",
  });

  const [walletBalance, setWalletBalance] = useState(100); // Default ₹100 bonus
  const [checkInToday, setCheckInToday] = useState(false);
  const [referralCode, setReferralCode] = useState("RAMESH100");
  const [referralInput, setReferralInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const address = data.address;
        const city = address?.city || address?.town || address?.village || "";
        const district = address?.county || address?.state_district || "";
        const state = address?.state || "";
        const fullLocation = [city, district, state].filter(Boolean).join(", ");

        setProfileData((prev) => ({ ...prev, location: fullLocation || "Unknown" }));
        alert("📍 Location updated!");
      } catch {
        alert("❌ Could not fetch location");
      }
    });
  };

  const handleManualCitySearch = async (query) => {
    setManualCityInput(query);
    if (query.length < 3) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=7`
      );
      const data = await res.json();
      setCitySuggestions(data);
    } catch (err) {
      console.error("❌ Manual search failed:", err);
    }
  };

  const handleCitySelect = (place) => {
    setProfileData((prev) => ({ ...prev, location: place.display_name }));
    setCitySuggestions([]);
    setManualCityInput("");
    alert("✅ Location selected!");
  };

  const handleDailyCheckIn = () => {
    if (checkInToday) return;
    setWalletBalance((prev) => prev + 10);
    setCheckInToday(true);
    alert("🎁 Daily bonus ₹10 added to wallet!");
  };

  const handleReferral = () => {
    if (referralInput.trim().length < 4) return alert("Invalid referral code");
    setWalletBalance((prev) => prev + 50);
    alert("🎉 Referral successful! ₹50 bonus added to wallet.");
    setReferralInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-6">
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">👤 User Profile</h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        {isEditing ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(profileData).map(([key, value]) => (
                key !== "location" && (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={key}
                    className="border rounded px-4 py-2"
                  />
                )
              ))}
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700">📍 Location</label>
              <button
                onClick={handleGetCurrentLocation}
                className="block mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                <FaMapMarkerAlt className="inline mr-1" /> Use My Location
              </button>
              <input
                type="text"
                placeholder="Search city..."
                value={manualCityInput}
                onChange={(e) => handleManualCitySearch(e.target.value)}
                className="w-full border mt-2 px-4 py-2 rounded"
              />
              {citySuggestions.length > 0 && (
                <ul className="bg-white border rounded mt-2 max-h-40 overflow-y-auto">
                  {citySuggestions.map((place, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                      onClick={() => handleCitySelect(place)}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <FaSave className="inline mr-1" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg font-medium text-gray-800 space-y-2">
              <p>👤 <strong>Name:</strong> {profileData.name}</p>
              <p>🔧 <strong>Skill:</strong> {profileData.skill}</p>
              <p>⭐ <strong>Rating:</strong> {profileData.rating}</p>
              {showDetails && (
                <>
                  <p>📞 <strong>Phone:</strong> {profileData.phone}</p>
                  <p>📧 <strong>Email:</strong> {profileData.email}</p>
                  <p>🛠 <strong>Experience:</strong> {profileData.experience}</p>
                  <p>🎂 <strong>Age:</strong> {profileData.age} yrs</p>
                  <p>📍 <strong>Location:</strong> {profileData.location}</p>
                </>
              )}
            </div>

            <div className="flex gap-4 mt-5">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 text-sm hover:underline"
              >
                {showDetails ? "Hide Details" : "View All Details"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange-600 text-sm hover:underline flex items-center gap-1"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </>
        )}

        {/* Wallet System */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <FaCoins className="inline text-yellow-500 mr-1" /> Wallet Balance: ₹{walletBalance}
          </p>
          <button
            onClick={handleDailyCheckIn}
            disabled={checkInToday}
            className={`mt-2 px-4 py-2 rounded text-sm text-white ${checkInToday ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {checkInToday ? <><FaCheckCircle className="inline mr-1" /> Checked In</> : "🎁 Daily Check-In Bonus"}
          </button>
        </div>

        {/* Referral */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-md font-semibold mb-2">
            <FaGift className="inline text-pink-500 mr-1" /> Refer a Friend
          </p>
          <p className="text-sm text-gray-600 mb-2">Your Referral Code: <span className="font-mono font-bold">{referralCode}</span></p>
          <input
            type="text"
            value={referralInput}
            onChange={(e) => setReferralInput(e.target.value)}
            placeholder="Enter friend's referral code"
            className="w-full border px-4 py-2 rounded mb-2"
          />
          <button
            onClick={handleReferral}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Apply Referral Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
