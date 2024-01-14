import { useReducer, useState } from 'react'
import './AnyBackAdminPanel.scss'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import Main from './components/Main/Main'
import RightSideBar from './components/RightSideBar/RightSideBar'
import { AdminPanelContext } from './hooks/useAdminPanel'
import AuthForm from './components/AuthForm/AuthForm'



var adminPanelReducer = (prevState, action) => {
  var [stateKey, key, value] = action
  var setCurrentState = prevState[stateKey][1]

  setCurrentState(prev => ({...prev, [key]: value}))
}


function AnyBackAdminPanel({
  options,
}) {

 

  var adminPanelState = useReducer(
    adminPanelReducer,
    {
      authed: true,

      current: useState({
        section: '',

        table: '',
        database: '',
        entryId: '',
      }),

      opened: useState({
        leftSideBar: true,
        main: false,
        rightSideBar: false,
      }),

      
    }
  )

  var adminState = adminPanelState[0]
  

  return (
    <AdminPanelContext.Provider value={adminPanelState}>
      
      {
        adminState.authed
        ? <>
          <LeftSideBar />
          <Main />
          <RightSideBar />
        </>
        : <AuthForm />
      }
    </AdminPanelContext.Provider>
    
  )

}

export default AnyBackAdminPanel
