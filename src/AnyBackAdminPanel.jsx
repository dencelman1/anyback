import {useCallback, useEffect, useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'
import LoadingBar from './components/svg/LoadingBar/LoadingBar'
import Auth from './api/local/Auth/Auth'

import CacheData from './api/local/CacheData/CacheData'
import AdminSection from './components/AdminSpace/content/AdminSection'
import AlertModalWindow from './base/alert/AlertModalWindow'





function AnyBackAdminPanel({
  options,
}) {

  var [isPrepared, setIsPrepared] = useState(
    false
  );
  
  var [userData, setUserData] = useState({
    authed: false,
    loadingMessage: "Entering",
  })

  var [adminSections, setAdminSections] = useState( [...AdminSection.states()] );


  var [current, setCurrent] = useState({
    section: (
      adminSections[CacheData.sectionIndex] || null
    ),
    entry: null,

    tableName: "",
    databaseName: "",
  })

  var [opened, setOpened] = useState({
    leftSideBar: Boolean(
      current.section ? CacheData.opened__leftSideBar: true
    ),
    rightSideBar: Boolean(CacheData.opened__rightSideBar),
  })

  


  

  useEffect(() => {
    CacheData.sectionIndex = adminSections.indexOf(current.section)
  }, [
    current.section,
  ])

  useEffect(() => {
    CacheData.opened__leftSideBar = opened.leftSideBar;
    CacheData.opened__rightSideBar = opened.rightSideBar;

  }, [
    opened,
  ])

  


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

    if (checkOperation instanceof Promise) {
      checkOperation
      .finally(() => setIsPrepared(true))
    }
    else {
      setIsPrepared(true)
    }
  }, [])


  useEffect(() => {
    setUserData(p => ({
      ...p,
      loadingMessage:
        (
          (

            (
              userData.authed
              && current.section
              && !( current.section.loaded )
            )
            && (
              current.section.loadingMessage[
                current.section.loadingState
              ]
            )
      
          )
          || (isPrepared ? "": (
            AdminSection.defaultLoadingMessage
          ))
        ),
    }))
    
    
  }, [
    userData.authed,
    current.section,
    adminSections,
    isPrepared,
  ])

  

  var adminCtx = useMemo(() => {
    var adminCtx = {
      userData, setUserData,
      current, setCurrent,
      opened, setOpened,
      options,
      sections: adminSections,
      setAdminSections,
    }
    
    
    Object.setPrototypeOf(adminCtx, adminCtxProto);
    return adminCtx;

  }, [
    userData,
    current,
    opened,
    options,
    adminSections,
  ])


  return (
    <AdminPanelContext.Provider
      value={adminCtx}
    >
      <AlertModalWindow />

      <LoadingBar
        loadingMessage={userData.loadingMessage}
      />

      <AdminSpace />

    </AdminPanelContext.Provider>
  )

}

export default AnyBackAdminPanel;

// TODO:
// DbManag:

//   __right:
//    1 базы данных
//    2 таблицы
//    3 field sorting, field order (for user personal settings) (in select and checkboxes and other UX elements near entries)

//    __main__toolbar:
//    1 query search, auto update (with debounce);

//    
//    __main__entryView:
//    1 entry view,
//    2 CRUD one (CRUD) and bulk (CRUD),

//    6 pagination,


// + Excalidraw;

// Analytics:
//    1 add and view formula and her code
//    2 list as forlmulas calculated datas
