import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO } from "../utils/contants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user.value);
  const navigate = useNavigate();

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
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.email.charAt(0).toUpperCase()}
              </span>
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
