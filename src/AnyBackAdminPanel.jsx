import { useEffect, useMemo, useState } from 'react'
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
    settings: CacheData.opened__settings || false,
  })

  


  

  useEffect(() => {
    CacheData.sectionIndex = adminSections.indexOf(current.section)
    
  }, [
    current.section,
  ])

  useEffect(() => {
    CacheData.opened__leftSideBar = opened.leftSideBar;
    CacheData.opened__rightSideBar = opened.rightSideBar;
    CacheData.opened__settings = opened.settings;

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

//    1 data (расположить по елементам нормально);
//      - size, isEmpty, tableEntryCount, reqSpeed, pagination buttons,

//    2 add function select from right three inputs (maybe set instead of inputs - selects) - db, table, entry (by id)
//    3 field sorting
//    4 textarea with support JSON (ready);

// Analytics:
//    1 add and view formula and her code
//    2 list as forlmulas calculated datas

//    3 textarea with support javascript and JSON (ready);
