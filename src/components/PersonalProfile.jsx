import { useSelector } from "react-redux";
import Header from "./Header";

const PersonalProfile = () => {
  const user = useSelector((store) => store.user.value);

  const profileData = {
    name: "John Doe",
    email: user?.email || "john.doe@example.com",
    memberSince: "January 2020",
    subscription: "Premium",
    profilePicture: null,
    preferences: {
      language: "English",
      region: "United States",
      autoplay: true,
      notifications: false,
    },
    watchTime: {
      thisMonth: "45h 32m",
      allTime: "1,234h 56m",
    },
    favoriteGenres: ["Action", "Sci-Fi", "Thriller", "Drama"],
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="px-8 md:px-16 pt-24 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Personal Profile
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Content */}
      <div className="px-8 md:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Overview Card */}
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mr-6">
                <span className="text-white font-bold text-2xl">
                  {profileData.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 text-lg">{profileData.email}</p>
                <p className="text-gray-500">
                  Member since {profileData.memberSince}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Subscription</h3>
                <p className="text-red-500 font-bold text-xl">
                  {profileData.subscription}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">This Month</h3>
                <p className="text-green-500 font-bold text-xl">
                  {profileData.watchTime.thisMonth}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">All Time</h3>
                <p className="text-blue-500 font-bold text-xl">
                  {profileData.watchTime.allTime}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preferences */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Language</span>
                  <span className="text-white font-medium">
                    {profileData.preferences.language}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Region</span>
                  <span className="text-white font-medium">
                    {profileData.preferences.region}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Autoplay</span>
                  <span
                    className={`font-medium ${
                      profileData.preferences.autoplay
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {profileData.preferences.autoplay ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Notifications</span>
                  <span
                    className={`font-medium ${
                      profileData.preferences.notifications
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {profileData.preferences.notifications
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Favorite Genres
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {profileData.favoriteGenres.map((genre, index) => (
                  <div
                    key={index}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-center font-medium"
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-gray-900 rounded-lg p-6 mt-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Account Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded transition-colors duration-200">
                Edit Profile
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded transition-colors duration-200">
                Change Password
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded transition-colors duration-200">
                Download Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;