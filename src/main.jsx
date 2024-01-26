import ReactDOM from 'react-dom/client'
import AnyBackAdminPanel from './AnyBackAdminPanel.jsx'
import './index.scss'

// default hotkeys:
  // F11 - fullscreen
  // F12 - open browser dev tools (console, etc.)
// 1 нужно указывать useAdminSection().finishLoad() чтобы ваша секция бьла загружена, загрузите все данные секции до выполнения этого метода
//   и также можно менять уведомление загрузки с помощью 
//   useAdminSection().changeLoadingState("your loadingMessage["STATE"] in options.sections")
// var adminSection = useAdminSection();
// useEffect(() => {
//   setTimeout(() => {
//       adminSection.finishLoad();
//   }, 5000);

//   return () => {
//       adminSection.startLoad();
//   }
// }, [])

var cachedToken = "MY_TOKEN"
var errorMessage = "Error: invalid password"


// what user have:
// 1 useAdminPanel
// 2 useAdminSection
// 3 options // + give

var defaultValue = {
  limit: 10,
  offset: 0,
}
var d = new Date().getTime()

var USERS_LENGTH = 150

var testUsers = Array.from({length: USERS_LENGTH}, (_, i) => ({id: d + 1, name: `entry${d + 1}`}))


// reqSpeed: 150, // request process speed in ms // TODO: on frontend

var options = {
  authTitle: 'Log in',
  
  defaultValue,

  getDatabases() {

    var databases = (
      [
        {
          name: 'dencelman.com',
          size: 15_000, // bytes
          isEmpty: false,

          tables: [
            {
              name: 'users',
              count: USERS_LENGTH,
              fields: [

                {
                  name: 'name',
                  type: 'number',
                }, // by default

                {
                  name: 'name',
                  type: 'string',
                },

              ],
            },
          ]
        },
      ]
    )
    
    return {
      data: databases,
    }
  },

  read(    
    database,
    table,

    where,

    limit,
    offset,
  ) {

    return {
      success: true,

      data: testUsers.slice(offset, ( offset + limit ))
    }
  },
  update(
    database,
    table,

    value,
    where,
  ) {

    return (
      {
        success: true,
      }
    )
  },

  delete(
    database,
    table,

    where,
  ) {

    return (
      {
        success: true,
      }
    )
  },

  create(
    database,
    table,

    value,
  ) {
    
    return {
      success: true,
    }
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
