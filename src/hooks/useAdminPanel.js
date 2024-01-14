import React, { useContext } from "react";

var AdminPanelContext = React.createContext(null)

var useAdminPanel = () => {
  var ctx = useContext(AdminPanelContext);

  return ctx
}


export {
  AdminPanelContext,
  useAdminPanel,
}
