import {useEffect, useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'
import LoadingBar from './components/svg/LoadingBar/LoadingBar'
import Auth from './api/local/Auth/Auth'
import adminSections from './components/AdminSpace/content/adminSections'
import CacheData from './api/local/CacheData/CacheData'




function AnyBackAdminPanel({
  options,
}) {

  var [userData, setUserData] = useState({
    authed: false,
    loadingMessage: "Entering",
  })

  var [current, setCurrent] = useState({
    section: adminSections[CacheData.sectionIndex] || null,
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

    console.log("AnyBackAdminPanel")
    if (current.section)
      setUserData(p => ({...p, loadingMessage: current.section.loadingMessage}))
    
  }, [
    current.section,
  ])

  useEffect(() => {
    CacheData.opened__leftSideBar = opened.leftSideBar
    CacheData.opened__rightSideBar = opened.rightSideBar
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
    
    var finishLoading = () => setUserData(p => ({
      ...p,
      loadingMessage: (
        (
          current.section &&
          current.section.loadingMessage
        ) || ""
      ),

    }))

    if (checkOperation instanceof Promise) {
      checkOperation.finally(finishLoading)
    }
    else {
      finishLoading()
    }
  }, [])


  
  var adminCtx = useMemo(() => {
    var adminCtx = {
      userData, setUserData,
      current, setCurrent,
      opened, setOpened,
      options,
      sections: adminSections,
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
//    1 базы данных
//    2 таблицы
//    3 CRUD, bulk (CRUD)
//    4 query search, auto update (with debounce), 
//    5 pagination
//    6 data about db - sizeMb, isEmpty, table - entriesAllCount, request - speedInSeconds
//    7 entries, entry view
//    8 field sorting, field order (for user personal settings)

// + Excalidraw;
