import Button from '../../UI/Button/Button';
import styles  from './AuthForm.module.scss';
import { useState } from 'react';
import options from '../../main';

var AuthForm = () => {
    const [state, setState] = useState({
        login: "",
        password: ""
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
      };

    const handleSubmit = function(event)  {
        event.preventDefault();
        console.log(state);
        let check = options.auth(state.login, state.password)
        console.log(check)
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
                                value={state.login}
                                />
                                
                        <input onChange={handleInputChange}
                         type="password"
                         name="password"
                         placeholder='Password'
                         value={state.password} 
                         />
                   </div>
                   <div className={styles['btn-cover']} >
                        <Button name={'Sign In'} /> 
                        <Button name={'Registration'} /> 
                   </div>
            </form>
        </>
    )
}

export default AuthForm;
