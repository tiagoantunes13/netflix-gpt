import { useRef, useState } from "react";
import Header from "./Header";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";
import ErrorInputMessage from "./ErrorInputMessage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [authenticationPassword, setAuthenticationPassword] = useState("");
  const [formSignup, setFormSignup] = useState(false);
  const [error, setError] = useState({});

  const name = useRef(null);

  const toggleForm = () => {
    setFormSignup(!formSignup);
  };

  const removeError = (field) => {
    setError({
      ...error,
      [field]: "",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/PT-en-20250721-TRIFECTA-perspective_25fb527a-6a90-426e-aad7-bdd711d5fe31_large.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-black bg-opacity-75 p-12 md:p-16 rounded w-full max-w-md">
          <h1 className="text-white text-3xl font-semibold mb-7">
            {formSignup ? "Sign Up" : "Sign In"}
          </h1>
          <form>
            <div className="space-y-4 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={() => {
                  setError({
                    ...error,
                    email: validateEmail(email),
                  });
                }}
                onFocus={() => removeError("email")}
                required="true"
                placeholder="Email or mobile number"
                className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
              />
              {error["email"] && <ErrorInputMessage message={error["email"]} />}
              {formSignup && (
                <div>
                  <input
                    type="text"
                    ref={name}
                    // value={name}
                    // onChange={(e) => {
                    //   setName(e.target.value);
                    // }}
                    onBlur={() => {
                      setError({
                        ...error,
                        name: validateName(name.current.value),
                      });
                    }}
                    onFocus={() => removeError("name")}
                    required="true"
                    placeholder="Name"
                    className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
                  />
                  {error["name"] && (
                    <ErrorInputMessage message={error["name"]} />
                  )}
                </div>
              )}
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={() => {
                  setError({
                    ...error,
                    password: validatePassword(password),
                  });
                }}
                onFocus={() => removeError("password")}
                required="true"
                placeholder="Password"
                className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
              />
              {error["password"] && (
                <ErrorInputMessage message={error["password"]} />
              )}
              {/* {formSignup && (
                <input
                  type="password"
                  value={authenticationPassword}
                  onChange={(e) => {
                    setAuthenticationPassword(e.target.value);
                  }}
                  required="true"
                  placeholder="Insert your Password again"
                  className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
                />
              )} */}

              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-sm transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const newErrors = {
                    email: validateEmail(email),
                    password: validatePassword(password),
                    ...(formSignup && {
                      name: validateName(name.current.value),
                    }),
                  };
                  setError(newErrors);

                  if (newErrors.email || newErrors.password || newErrors.name) {
                    console.log("There is at least an error");
                    return;
                  }
                  if (formSignup) {
                    createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        console.log("Created an User:");
                        console.log(user);
                        // ...
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(
                          `SIGN UP ERROR -> ${errorCode} - ${errorMessage}`
                        );
                        // ..
                      });
                  } else {
                    signInWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;

                        console.log("Entered an User:");
                        console.log(user);
                        // ...
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(
                          `LOGIN ERROR -> ${errorCode} - ${errorMessage}`
                        );
                      });
                  }
                }}
              >
                {formSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>

          <div className="flex items-center mb-4 mt-0">
            <input id="rememberMe" type="checkbox" className="mr-2 w-4 h-4" />
            <label className="text-gray-400" htmlFor="rememberMe">
              Remember me
            </label>
            <a
              className="text-gray-400 ml-auto hover:underline text-xs"
              href="#"
            >
              Help?
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            {formSignup ? "Already have an account" : "New to Netflix?"}
            <a
              className="text-white hover:underline ml-1"
              href="#"
              onClick={toggleForm}
            >
              {formSignup ? "Login now" : "Sign up now"}
            </a>
          </div>

          {/* <div className="text-center mb-4">
            <span className="text-gray-300 text-sm">OR</span>
          </div> */}

          {/* <button className="w-full bg-gray-500 bg-opacity-60 hover:bg-opacity-80 text-white font-medium py-3 rounded-sm transition-all mb-6">
            Use a Sign-In Code
          </button>

          <div className="text-center mb-4">
            <a href="#" className="text-white hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2 w-4 h-4" />
            <label htmlFor="remember" className="text-white text-sm">
              Remember me
            </label>
          </div>

          <div className="text-gray-400 text-sm">
            New to Netflix?
            <a href="#" className="text-white hover:underline ml-1">
              Sign up now.
            </a>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </div> */}
        </div>
      </div>

      {/* <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-black bg-opacity-75 p-12 md:p-16 rounded w-full max-w-md">
          <h1 className="text-white text-3xl font-semibold mb-7">Sign In</h1>
          <form className="">
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
            />
            <label htmlFor="passwordInput">Password</label>
            <input
              id="passwordInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-4 bg-gray-800 bg-opacity-80 text-white rounded-sm border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-700"
            />
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-sm transition-colors">
              Sign In
            </button>{" "}
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
