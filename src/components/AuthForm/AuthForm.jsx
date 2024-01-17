import styles  from './AuthForm.module.scss';
import { useState } from 'react';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import Button from '../../base/builtIn/Button/Button';



var AuthForm = ({
  options,
}) => {
  
  var adminPanel = useAdminPanel()

  var [inputValue, setInputValue] = useState({
    login: "",
    password: ""
  });

  var handleInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var handleSubmit = function(event) {
    event.preventDefault();
    let result = options.auth(inputValue.login, inputValue.password)
    adminPanel.setUserData((prev) => ({
      ...prev,
      authed: result,
    }));
  }

  return (
      <>
        <form  onSubmit={handleSubmit} className={styles['wrap-form']}>
          <span>
            <p>Sign In</p>
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
