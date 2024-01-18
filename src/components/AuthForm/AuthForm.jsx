import './AuthForm.scss';
import { useState } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import { Button, FormInput, Input } from '../../base/builtIn';
import Auth from './Auth';


const cookies = new Cookies();


var AuthForm = ({
  options,
}) => {
  
  var adminPanel = useAdminPanel()

  var [inputValue, setInputValue] = useState({
    login: "",
    password: ""
  });

  var [alertMessage, setAlertMessage] = useState("")// TODO: render to JSX element down

  // useEffect(() => {}, [alertMessage])

  var handleInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var setAuthed = (newValue) => {

    adminPanel.setUserData((prev) => ({
      ...prev,
      authed: newValue,
    }));

  }

  var handleSubmit = function(event) {
    event.preventDefault();
    var result = options.auth(inputValue.login, inputValue.password)

    Auth.setUserResult(result, setAuthed)
  }

  return (
      
        <form
          onSubmit={handleSubmit}
          className="AuthForm"
        >

          <h1
            className="title"
          >
            {options.name}
          </h1>

          <div
            className="inputs"
          >
            <FormInput
              label="login"
              type="text"
              value={inputValue.login}
              onChange={handleInputChange}

            />

            <FormInput
              type="text"
              label="password"
              value={inputValue.password}
              onChange={handleInputChange}
            />
          </div>

          <div
            className='buttons'
          >
            <Button
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
