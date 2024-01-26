import React, { useContext, useState } from "react";
import Auth from "../api/local/Auth/Auth";

var AdminPanelContext = React.createContext(null)

var useAdminPanel = () => {
  var ctx = useContext(AdminPanelContext);
  
  return ctx
}

var adminCtxProto = {
  setLoadingMessage(
    text,
  ) {

    this.setUserData(p => ({
      ...p,
      loadingMessage: text,
    }))

  },
  
  isSectionChosen() {
    return (
      this.current.section !== null
    )
  },
  
  withLoading(
    loadingMessage,
    cb,
  ) {
    var finishLoading = () => this.setUserData(p => ({...p, loadingMessage: ''}))

    this.setUserData(p => ({...p, loadingMessage }))

    if (cb instanceof Promise) {
      cb
      .finally(finishLoading)
    }
    else {
      cb()
      finishLoading()
    }

  },

  logout(
    cb,
  ) {
    
    var logoutOperation = () => (
      this.setUserData(p => (
        {...p, authed: false}
      ))
    )

    this.withLoading("Logout", () => {
      
      Auth.token.delete();
      
      var result = cb()

      if (result instanceof Promise) {

        result
        .finally(() => {
          logoutOperation()
        })

      }
      else {

        logoutOperation()

      }

    })

    
    
  },

}



export {
  AdminPanelContext,
  adminCtxProto,
  useAdminPanel,
}
