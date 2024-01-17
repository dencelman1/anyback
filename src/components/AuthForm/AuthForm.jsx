import styles  from './AuthForm.module.scss';
import { useEffect, useState } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import Button from '../../base/builtIn/Button/Button';
import { isPromise } from 'util/types';
import { set } from 'immutable';



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
      <>
        <form  onSubmit={handleSubmit} className={styles['wrap-form']}>

          <span>
            <p>{options.name}</p>
          </span>

          <div className={styles['inputs']}>
            <input onChange={handleInputChange}
              type="text"
              name="login" 
              placeholder='Email'
              value={inputValue.login}
            />
                      
            <input onChange={handleInputChange}
              type="password"
              name="password"
              placeholder='Password'
              value={inputValue.password}
            />
          </div>
          <div className={styles['btn-cover']} >
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
      </>
  )
}

export default AuthForm;
