import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { StepperProgressContext } from "../../App";
import { maincontainer } from "../../pages/Home";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { registerUser } from "../../store/userThunks";
import UserCredentials from "../../pages/UserCredentials";
interface MainContainerContext {
  current: HTMLDivElement | null;
  pages: React.FC[];
  setPages: React.Dispatch<React.SetStateAction<React.FC[]>>;
}

const SignUp = () => {
  const { setIsVisible } = useContext(StepperProgressContext) as {
    setIsVisible: (value: boolean) => void;
  };
  const { status, isAuthenticated } = useAppSelector((state) => state.user);

  const mainContent = useContext(maincontainer) as MainContainerContext;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [naviagateNext, setNavigateNext] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsVisible(true);
    const email = (event.currentTarget[0] as HTMLInputElement).value;
    const password = (event.currentTarget[1] as HTMLInputElement).value;
    const confirmPassword = (event.currentTarget[2] as HTMLInputElement).value;
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);

    dispatch(registerUser(data));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (mainContent.current && isAuthenticated) {
      mainContent.setPages((prev) => [...prev, UserCredentials]);
      mainContent.current.scrollTo({
        left: mainContent.current.scrollWidth / mainContent.pages.length,
        behavior: "smooth",
      });
      // console.log(mainContent.current);
      setNavigateNext(true);
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (mainContent.current && isAuthenticated) {
  //     console.log("gvsd");
  //     const observer = new MutationObserver(() => {
  //       if (mainContent.current) {
  //         const firstChild = mainContent.current.children[0] as HTMLElement;
  //         const childrenCount = firstChild?.children.length;
  //         console.log(childrenCount);
  //         // Check if the first child has children
  //         if (childrenCount && childrenCount > 1) {
  //           // If you want to ensure you are reacting to changes:
  //           console.log("navigate");
  //           setNavigateNext(true); // Set loading complete if first child has multiple children
  //         }
  //       }
  //     });

  //     observer.observe(mainContent.current, {
  //       childList: true,
  //       subtree: true,
  //     });

  //     return () => {
  //       observer.disconnect(); // Clean up observer on unmount
  //     };
  //   }
  // }, [mainContent]);
  useEffect(() => {
    if (mainContent.current && naviagateNext) {
      setNavigateNext(false);
      console.log(mainContent.pages);
      mainContent.current.scrollTo({
        left: mainContent.current.scrollWidth / mainContent.pages.length,
        behavior: "smooth",
      });
      setTimeout(() => {
        mainContent.setPages((prev) => [...prev.slice(1)]);
      }, 1000);
    }
  }, [naviagateNext]);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-gray-900/75 p-8 rounded-lg h-full shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 text-gray-900 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 p-2 text-gray-900 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 mt-[24px] flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="block  text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="mt-1 p-2 text-gray-900 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 mt-[24px] flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon className="h-5 w-5" icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon className="h-5 w-5" icon={faEye} />
              )}
            </div>
          </div>

          {/* Stay Signed In and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                Stay signed in
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="w-full  bg-yellow-600 text-gray-800 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 font-bold focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
