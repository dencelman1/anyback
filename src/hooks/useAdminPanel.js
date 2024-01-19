import React, { useContext } from "react";

var AdminPanelContext = React.createContext(null)

var useAdminPanel = () => {
  var ctx = useContext(AdminPanelContext);

  return ctx
}

var adminCtxProto = {
  isSectionChosen() {
    return this.current.section !== ""
  },
  currentSection() {

    return (
      this.sections
      .filter(s => s.name === this.current.section)
      [0]
    )
    
  }
}



export {
  AdminPanelContext,
  adminCtxProto,
  useAdminPanel,
}
