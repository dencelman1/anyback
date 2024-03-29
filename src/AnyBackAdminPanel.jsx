import { useEffect, useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss';
import './index.scss';

import AdminSpace from './components/AdminSpace/AdminSpace.jsx'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel.js'
import LoadingBar from './components/svg/LoadingBar/LoadingBar.jsx'
import Auth from './api/local/Auth/Auth.js'

import CacheData from './api/local/CacheData/CacheData.js'
import AdminSection from './components/AdminSpace/content/AdminSection.jsx'
import AlertModalWindow from './base/alert/AlertModalWindow.jsx'
import { getThemeValue } from './components/AdminSpace/SettingsModalBlock/GlobalSettings/ThemeSelect/ThemeSelect.jsx'


var AnyBackAdminPanel = ({
  options,
}) => {

  var [isPrepared, setIsPrepared] = useState(
    false
  );
  
  var [userData, setUserData] = useState({
    authed: false,
    loadingMessage: "Entering",
    theme: CacheData.theme || 'light',
  })

  useEffect(() => {

    document.body.classList.value = (
      getThemeValue(
        CacheData.theme = ( userData.theme )
      )
    );

  }, [
    userData.theme
  ])

  

  var [
    adminSections,
    setAdminSections
  ] = useState( [...( AdminSection.states() )] );


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

// Analytics:
// - dark theme;
// - npm;
