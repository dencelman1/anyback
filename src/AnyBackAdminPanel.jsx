import { useEffect, useReducer, useState } from 'react'
import './AnyBackAdminPanel.scss'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import Main from './components/Main/Main'
import RightSideBar from './components/RightSideBar/RightSideBar'
import { AdminPanelContext } from './hooks/useAdminPanel'
import AuthForm from './components/AuthForm/AuthForm'
import { AuthlContext,useAuth } from './hooks/authContext'


var adminPanelReducer = (prevState, action) => {
  var [stateKey, key, value] = action
  var setCurrentState = prevState[stateKey][1]

  setCurrentState(prev => ({...prev, [key]: value}))
}




function AnyBackAdminPanel({
  options,
}) {

   
  const [islogin, setislogin] = useState(false)
  
  var adminPanelState = useReducer(
    adminPanelReducer,
    {
      

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
  console.log(adminState)
  
  return (
   
    <AuthlContext.Provider value={{islogin,setislogin}} >
      
    <AdminPanelContext.Provider value={adminPanelState}>
      
      {
        islogin
        ? <>
          <LeftSideBar />
          <Main />
          <RightSideBar />
        </>
        : <AuthForm />
      }
    </AdminPanelContext.Provider>
    </AuthlContext.Provider>
  )

}

export default AnyBackAdminPanel
