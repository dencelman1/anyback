import {useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'
import LoadingBar from './components/svg/LoadingBar/LoadingBar'
import Auth from './components/AuthForm/Auth'
import adminSections from './components/AdminSpace/content/adminSections'


function documentOnKeyDown (event) {
  // default hotkeys:
  // F11 - fullscreen
  // F12 - open browser dev tools (console, etc.)
  
}

var setFlagsSettings = (options) => {
  var flags = options.flags
  

  useEffect(() => {
    if (!(flags.useDefaultHotkeys))
      return

    document.addEventListener("keydown", documentOnKeyDown)
    return () => {
      document.removeEventListener("keydown", documentOnKeyDown)
    }

  }, [
    options,
  ])
}

function AnyBackAdminPanel({
  options,
}) {

  setFlagsSettings(options)
  
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
    section: null,

    table: null,
    database: null,
    entry: null,

    hotkeyHandler: null,
  })

  



  
  var currentSection = useMemo(() => {
    return (
      adminSections
      .filter(s => s === current.section)
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

// TODO:
// DbManag:
//    1 базы данных
//    2 таблицы
//    3 CRUD, bulk (CRUD)
//    4 query search, auto update (with debounce), 
//    5 pagination
//    6 data about db - sizeMb, isEmpty, table - entriesAllCount, request - speedInSeconds
//    7 entries, entry view
//    8 field sorting, field order (for user personal settings)

// + Excalidraw;
