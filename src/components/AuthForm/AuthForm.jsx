import './AuthForm.scss';
import { useState } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import { Button, FormInput, Input } from '../../base/builtIn';



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


  function setAuth(result) {
    var setAuthed = (value) => {
      adminPanel.setUserData((prev) => ({
        ...prev,
        authed: value,
      }));
    }

    if (result instanceof Promise) {
      result
      .then((value) => {
        setAuthed(value)
      })
      .catch(error => {
        setAlertMessage(error)
      })
    }
    else if (typeof result === "boolean") {
      setAuthed(result)
    }
    else if (typeof result === "string") {
      setAuthed(true);
      localStorage.setItem("authToken", result); // TODO: change to cookie CRUD
    }
    
  }

  var handleSubmit = function(event) {
    event.preventDefault();
    var result = options.auth(inputValue.login, inputValue.password)
    setAuth(result)
    
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
