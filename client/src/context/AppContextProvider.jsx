import { useEffect, useState } from "react";
import { AppContent } from "./AppContext";
import axios from "axios";

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/data",
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      // ❌ no toast here
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/auth/is-auth",
          { withCredentials: true }
        );

        if (data.isAuthenticated) {
          setIsLoggedin(true);
          getUserData();
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }

      } catch (error) {
        // ❌ NEVER toast here
       console.log(error.message);
      }
    };

    getAuthStatus();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
