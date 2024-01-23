import ReactDOM from 'react-dom/client'
import AnyBackAdminPanel from './AnyBackAdminPanel.jsx'
import './index.scss'

// default hotkeys:
  // F11 - fullscreen
  // F12 - open browser dev tools (console, etc.)
// 1 нужно указывать useAdminSection().finishLoad() чтобы ваша секция бьла загружена, загрузите все данные секции до выполнения этого метода

var cachedToken = "MY_TOKEN"
var errorMessage = "Error: invalid password"




var options = {
  authTitle: 'Log in',

  read() {
    
  },
  update() {

  },
  delete() {

  },
  create() {

  },

  checkAuth: (
    result, // token
  ) => { // Promise<boolean> or boolean возвращает
    return new Promise((res) => res(result === cachedToken))
    // 1 true
      // pass to admin panel
    
    // 2 false
      // delete token from cookie
      // authed = false
      // go to auth form

    // 3 Promise -> true | false 
      // {SAME}

    // 4 Promise -> error
      // .catch(error => {
      //  return false
      // })
    
  },

  auth: (login, password) => {
    // return true

    // 1
    // return new Promise((res, rej) => res(true))
    // return "myToken"
    // return (login === 'Masha' && password === '1234')
    
    // 2
    // return new Promise((res, rej) => {
    //   res(true)
    // })

    // 3
    // return new Promise((res, rej) => {
    //   res("AUTH_TOKEN")
    // })

    return new Promise((res, rej) => {

      var authed = (login === "Masha" && password === "1234")
      if (authed)
        return res(cachedToken)

      rej(errorMessage)
    })

  },

  onLogout() {
    console.log("logouted")
  },





}


var rootElement = document.querySelector('#root');
var root = ReactDOM.createRoot(rootElement);

root.render(
  <AnyBackAdminPanel
    options={options}
  />
)
