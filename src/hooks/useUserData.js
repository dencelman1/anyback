import React, { useContext } from "react"

var defaultUserData = {
    currentTable: '',
    currentDatabase: '',
    currentEntryData: {},
    
    
}

var UserDataContext = React.createContext(defaultUserData)

var useUserData = () => {
  return useContext(UserDataContext)
}

export {
    useUserData,
    defaultUserData,
}

// """Redux + JWT authorization"""