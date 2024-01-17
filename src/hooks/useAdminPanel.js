import React, { useContext } from "react";

var AdminPanelContext = React.createContext(null)

var useAdminPanel = () => {
  var ctx = useContext(AdminPanelContext);

  return ctx
}
var adminCtxProto = {
  isSectionChosen() {
    return this.current.section !== ""
  }  
}



export {
  AdminPanelContext,
  adminCtxProto,
  useAdminPanel,
}
