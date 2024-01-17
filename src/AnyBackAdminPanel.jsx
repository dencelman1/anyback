import { useState } from 'react'
import './AnyBackAdminPanel.scss'

import AuthForm from './components/AuthForm/AuthForm'
import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext } from './hooks/useAdminPanel'


function AnyBackAdminPanel({
  options,
}) {

  var [userData, setUserData] = useState({
    authed: true,
  })

  var [current, setCurrent] = useState({
    section: '',

    table: '',
    database: '',
    entryId: '',
  })
  
  var [opened, setOpened] = useState({
    leftSideBar: true,
    main: false,
    rightSideBar: false,

  })

  var adminCtxProto = {
    isSectionChosen() {
      return this.current.section !== ""
    }  
  }
  

  var adminCtx = {
    userData, setUserData,
    current, setCurrent,
    opened, setOpened,
    
  }
  Object.setPrototypeOf(adminCtx, adminCtxProto)

  return (
    <AdminPanelContext.Provider value={adminCtx}>
      {
        
        userData.authed
        ? <AdminSpace />
        : <AuthForm />
      
      }
    </AdminPanelContext.Provider>
    
  )

}

export default AnyBackAdminPanel
