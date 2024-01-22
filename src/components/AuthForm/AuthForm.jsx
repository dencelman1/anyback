import './AuthForm.scss';
import { useState } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import { Button, FormInput } from '../../base/builtIn';
import Auth from './Auth';
import Text from '../../base/utils/Text';
import AnybackLogo from '../svg/AnybackLogo/AnybackLogo';





var AuthForm = () => {
  
  var adminPanel = useAdminPanel()
  var options = adminPanel.options

  var [inputValue, setInputValue] = useState({
    login: "",
    password: ""
  });

  var [alertMessage, setAlertMessage] = useState("")// TODO: render to JSX element down

  var handleInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var setAuthed = (isAuthed) => {

    adminPanel.setUserData((prev) => ({
      ...prev,
      authed: isAuthed,
    }));

  }

  var handleSubmit = function(event) {
    event.preventDefault();
    var result = options.auth(inputValue.login, inputValue.password)
    Auth.set(
      result,
      
      function(authed) {
        if (authed)
          setAlertMessage("")
        setAuthed(authed)
      },

      setAlertMessage,
    )
    
  }

  return (
      
        <form
          onSubmit={handleSubmit}
          className="AuthForm"
          action="https://google.com"
          method="get"
          
        >

          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <AnybackLogo
              href={import.meta.env.VITE__ANYBACK_PROJECT_URL}
              side="46px"
              
              style={{
                margin: "auto 10px auto auto",
              }}
            />
            
            <h1
              className="title"
            >
              {Text.getLimited(options.name, 15)}
            </h1>
          </div>

          <div
            className="inputs"
          >
            <FormInput
              name="login"
              label="login"
              type="text"
              value={inputValue.login}
              onChange={handleInputChange}
              autoComplete="login"
              required
            />

            <FormInput
              autoComplete="password"
              name="password"
              label="password"
              type="password"
              value={inputValue.password}
              onChange={handleInputChange}
              required
            />

          </div>
          <div
            className='buttons'
          >
            <p
              className='error-message'
              title={alertMessage}
            >
              {Text.getLimited(alertMessage, 40)}
            </p>

            <Button
              type="submit"
              name={"Log in"}
              style={{
                background: 'white'
              }}
            >
              Log in
            </Button>
          </div>
        </form>

  )
}

export default AuthForm;
