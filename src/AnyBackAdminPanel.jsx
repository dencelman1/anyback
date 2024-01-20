import {useEffect, useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'
import LoadingBar from './components/svg/LoadingBar/LoadingBar'
import Auth from './components/AuthForm/Auth'
import adminSections from './components/AdminSpace/content/adminSections'






function AnyBackAdminPanel({
  options,
}) {
  
  var [userData, setUserData] = useState({
    authed: false,
    loadingMessage: "Entering",
  })

  
  useEffect(() => {
    var resultValue = Auth.token.get() // token + and etc
    var checkResult = options.checkAuth(resultValue)

    var setAuthed = (authed) => (
      
      setUserData(prev => ({
        ...prev,
        authed,
      }))

    )

    var checkOperation = (

      Auth.check(
        checkResult,

        setAuthed,

        (error) => {
          Auth.token.delete();
          setAuthed(false)
        }

      )

    )

    var finishLoading = () => setUserData(p => ({...p, loadingMessage: ""}))

    if (checkOperation instanceof Promise) {
      checkOperation.finally(finishLoading)
    }
    else {
      finishLoading()
    }
  }, [])

  var [current, setCurrent] = useState({
    section: '',

    table: '',
    database: '',
    entryId: '',
  })

  var currentSection = useMemo(() => {
    return (
      adminSections
      .filter(s => s.name === current.section)
      [0]
    )
  },
  [
    current,
    adminSections,
  ])
  
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
      options,
      sections: adminSections,
      currentSection,
    }
    
    
    Object.setPrototypeOf(adminCtx, adminCtxProto);
    return adminCtx;

  }, [
    userData,
    current,
    opened,
    options,
    adminSections,
    currentSection,
  ])


  
  

  return (
    <AdminPanelContext.Provider
      value={adminCtx}
    >
      <LoadingBar
        loadingMessage={userData.loadingMessage}
      />

      <AdminSpace />

    </AdminPanelContext.Provider>
  )

}

export default AnyBackAdminPanel
