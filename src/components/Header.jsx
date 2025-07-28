import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
  const user = useSelector((store) => store.user.value);

  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 left-0 z-50 w-full px-8 py-6 bg-gradient-to-b from-black">
      <div className="flex items-center justify-between">
        <img
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1a7-75a7-a8b7-f85133e4c823/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix"
          className="w-44"
        />
        {user?.email && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-white font-medium text-lg hidden sm:block">
              {user.displayName}
            </h1>
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Signing out");
                  })
                  .catch((error) => {
                    console.log("An error occured while trying to sign out");
                  });
                // dispatch(removeUser());
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
