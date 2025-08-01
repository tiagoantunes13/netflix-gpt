import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO } from "../utils/contants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const user = useSelector((store) => store.user.value);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsHovered(false);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div className="absolute top-0 left-0 z-50 w-full px-8 py-6 bg-gradient-to-b from-black">
      <div className="flex items-center justify-between">
        <img
          src={LOGO}
          alt="Netflix"
          className="w-44 cursor-pointer"
          onClick={() => {
            navigate("/browse");
          }}
        />
        {user?.email && (
          <div className="flex items-center space-x-3">
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="w-8 h-8 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-white font-semibold text-sm">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>

              {(isDropdownOpen || isHovered) && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // TODO: Navigate to payment settings
                      console.log("Navigate to payment settings");
                    }}
                  >
                    💳 Payment Settings
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    👤 Personal Profile
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // TODO: Navigate to account settings
                      console.log("Navigate to account settings");
                    }}
                  >
                    ⚙️ Account Settings
                  </button>
                </div>
              )}
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors duration-200 ml-2"
              onClick={() => {
                navigate("/favorites");
              }}
            >
              Favorites
            </button>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors duration-200 ml-2"
              onClick={() => {
                navigate("/gpt-search");
              }}
            >
              🤖 GPT Search
            </button>

            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Signing out");
                  })
                  .catch((error) => {
                    console.log("An error occured while trying to sign out");
                  });
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors duration-200 ml-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
