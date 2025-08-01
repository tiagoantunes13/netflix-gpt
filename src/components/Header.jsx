import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO } from "../utils/contants";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const user = useSelector((store) => store.user.value);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  // const [timeoutId, setTimeoutId] = useState();
  const timeoutId = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const mouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setModal(true);
      console.log("SET TO true");
    }, 150);
  };

  const mouseLeave = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setModal(false);
      console.log("SET TO FALSE");
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
            <div className="relative">
              <div
                className="w-8 h-8 bg-red-600 rounded flex items-center justify-center"
                onMouseEnter={() => {
                  mouseEnter();
                }}
                onMouseLeave={() => {
                  mouseLeave();
                }}
              >
                <span className="text-white font-semibold text-sm cursor-pointer relative">
                  {user.email.charAt(0).toUpperCase()}
                  {modal && (
                    <div className="absolute left-0 top-8 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-600 truncate">
                          {user.email}
                        </p>
                      </div>

                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          // TODO: Navigate to payment settings
                          console.log("Navigate to payment settings");
                        }}
                      >
                        💳 Payment Settings
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        👤 Personal Profile
                      </button>

                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          // TODO: Navigate to account settings
                          console.log("Navigate to account settings");
                        }}
                      >
                        ⚙️ Account Settings
                      </button>
                    </div>
                  )}
                </span>
              </div>
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
