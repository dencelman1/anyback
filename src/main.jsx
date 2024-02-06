import ReactDOM from 'react-dom/client'
import AnyBackAdminPanel from './AnyBackAdminPanel.jsx'
import './index.scss'
import LocalBackend from './LocalBackend.js'

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

var options = {
  authTitle: 'Log in',
  
  defaultValue: {

    offset: 0,
    limit: 20,

    searchDebounceDelay: 100,
    currentEntryKey: "id",
    
  },

  border: {

    reqDelayMs: 1000,
    maxCreateManyEntry: 20,

  },

  getDatabases() {

    var databases = (
      [
        {
          name: 'dencelman.com',

          extra: {
            size: 15_000, // bytes
            isEmpty: false,

            anyData: 'fuck_you',
          },
          
          tables: [
            {
              name: 'users',
              
              extra: {
                count: 150,
                hello: 'world',
                
              },

              fields: [

                {
                  name: 'name',
                  type: 'string',
                  defaultValue: '',
                },

                {
                  name: 'age',
                  type: 'number',
                  defaultValue: 60,
                },

                {
                  name: 'is_full_year',
                  type: 'boolean',
                  defaultValue: false,
                },
                

              ],
            },

            {
              name: 'posts',
              extra: {
                count: 10050
              },

              fields: [

                {
                  name: 'title',
                  type: 'string',
                  defaultValue: '',
                },
                {
                  name: 'description',
                  type: 'string',
                  defaultValue: '',
                },


              ],
            },
          ]
        },
      ]
    )
    
    return databases;
  },

  read(    
    databaseName,
    tableName,

    offset,
    limit,

    where,
  ) {
    
    return (new Promise((res, rej) => {
      setTimeout(() => {
        
        
          res(
            LocalBackend.read(databaseName, tableName, where)
            .slice(offset, ( offset + limit ))
          )
          
        

      }, 1000)
    }))

  },
  update(
    databaseName,
    tableName,

    value,
    where,
  ) {
    
    return (
      LocalBackend
      .update(databaseName, tableName, value, where)
    )

  },

  delete (
    databaseName,
    tableName,

    where,
  ) {
    
    var response = {
      success:
        LocalBackend.delete_(databaseName, tableName, where),
    }

    return response.success
  },

  create(
    databaseName,
    tableName,

    value,
  ) {
    

    return new Promise((res, rej) => {
      LocalBackend.create(databaseName, tableName, {
        id: LocalBackend.generateId(),
        ...value,
      });
      
      var response = {
        success: true,
      }
      
      res(response.success)
    });


  },

  checkAuth(
    result, // token
  ) { // Promise<boolean> or boolean возвращает
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

  auth(login, password) {
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

  
  analEnv: {

    count(where) {

      return new Promise((res, rej) => {
        res(where?.isAdmin ? 15_000: 1_000_000);
        
      })
      
    },

  }
}


var rootElement = document.querySelector('#root');
var root = ReactDOM.createRoot(rootElement);

root.render(
  <AnyBackAdminPanel
    options={options}
  />
)
