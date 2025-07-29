import appStore from "../utils/appStore";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializableUser = {
          accessToken: user.accessToken,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        };
        dispatch(addUser(serializableUser));
        const hasBrowseComponent = React.Children.toArray(children).some(
          (child) => React.isValidElement(child) && child.type === Login
        );
        if (hasBrowseComponent) {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        const hasBrowseComponent = React.Children.toArray(children).some(
          (child) => React.isValidElement(child) && child.type === Browse
        );
        const message = hasBrowseComponent && {
          state: { message: "Please log in to access this page" },
        };
        navigate("/", message);
      }
    });

    return unsubscribe;
  }, []);

  return children;
};

export default AuthWrapper;
