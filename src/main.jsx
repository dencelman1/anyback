import ReactDOM from 'react-dom/client'
import AnyBackAdminPanel from './AnyBackAdminPanel.jsx'
import './index.scss'



var options = {
  
  auth: (login, password) => {

    return (login === 'Masha' && password === "1234")
    
    // return Promise((res, rej) => {
    //   fetch("url", {
    //     method: "POST",
    //     body: JSON.stringify({ login, password })
    //   })
    //   .then(r => r.json())
    //   .then(data => {
    //     res(data.success)
    //   })
    //   .then(error => {
    //     res(false)
    //   })
    // })
  }
}

var AdminPanelElement = (
  <AnyBackAdminPanel
    options={options}
  />
)

var rootElement = document.getElementById('root')
var root = ReactDOM.createRoot(rootElement)
root.render(AdminPanelElement)