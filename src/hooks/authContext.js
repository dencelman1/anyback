import React, { useContext } from "react";

var AuthlContext = React.createContext(null)

var useAuth = () => {
  var res = useContext(AuthlContext);

  return res
}


export {
    AuthlContext,
  useAuth,
}
