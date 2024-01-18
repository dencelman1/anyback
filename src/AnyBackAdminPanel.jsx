import { useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AuthForm from './components/AuthForm/AuthForm'
import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'


function AnyBackAdminPanel({
  options,
}) {

  var [userData, setUserData] = useState({
    authed: false,
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

  var adminCtx = useMemo(() => {
    var adminCtx = {
      userData, setUserData,
      current, setCurrent,
      opened, setOpened,
    }
    
    Object.setPrototypeOf(adminCtx, adminCtxProto);
    return adminCtx;

  }, [
    userData,
    current,
    opened,
  ])
  

  return (
    <AdminPanelContext.Provider value={adminCtx}>
      <AdminSpace options={options}/>
    </AdminPanelContext.Provider>
  )

}

export default AnyBackAdminPanel
