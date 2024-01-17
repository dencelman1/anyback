import React, { useContext } from "react"

var UserDataContext = React.createContext(null)

var useUserData = () => {
  var ctx = useContext(UserDataContext);
  return ctx;
}

export {
    useUserData,
    defaultUserData,
}

// """JWT authorization"""
