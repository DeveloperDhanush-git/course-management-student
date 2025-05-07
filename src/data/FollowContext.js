import React, { createContext, useContext, useState, useEffect } from "react";

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followedUsers, setFollowedUsers] = useState({});

  useEffect(() => {
    // Load follow states from localStorage
    const storedFollowedUsers = JSON.parse(localStorage.getItem("followedUsers")) || {};
    setFollowedUsers(storedFollowedUsers);
  }, []);

  const toggleFollow = (id) => {
    setFollowedUsers((prevState) => {
      const newFollowState = { ...prevState, [id]: !prevState[id] };
      localStorage.setItem("followedUsers", JSON.stringify(newFollowState));
      return newFollowState;
    });
  };

  return (
    <FollowContext.Provider value={{ followedUsers, toggleFollow }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  return useContext(FollowContext);
};
