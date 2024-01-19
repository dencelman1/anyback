import {useEffect, useMemo, useState } from 'react'
import './AnyBackAdminPanel.scss'

import AdminSpace from './components/AdminSpace/AdminSpace'
import { AdminPanelContext, adminCtxProto } from './hooks/useAdminPanel'
import LoadingBar from './components/svg/LoadingBar'
import Auth from './components/AuthForm/Auth'
import { Cookie } from './base/utils'


function AnyBackAdminPanel({
  options,
}) {
  
  var [userData, setUserData] = useState({
    authed: false,
    haveLoading: true,
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
          setAuthed(false)
        }
      )
    )

    var finishLoading = () => setUserData(p => ({...p, haveLoading: false}))

    if (checkOperation instanceof Promise) {
      checkOperation.finally(() => {
        finishLoading()
      })
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


  if (userData.haveLoading)
    return <LoadingBar />
  

  return (
    <AdminPanelContext.Provider
      value={adminCtx}
    >

      <AdminSpace
        options={options}
      />

    </AdminPanelContext.Provider>
  )

}

export default AnyBackAdminPanel
