import { useState, useRef, useContext } from 'react'; // importing the useContext hook
import AuthContext from '../../store/auth-context'; // importing the AuthContext state object
// from the ContextAPI file

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  
  const authCtx = useContext(AuthContext); // initializing the authCtx variable with 
  // useContext hook 

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {

    event.preventDefault(); 
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value; 

    setIsLoading(true); 
    if(isLogin){ 
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJ5auP7kJWGIaBBmkmUS9Y8nDVj63j944',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true 
          }),
          headers: {
            'Content-type': 'application/json'
          }
        }
      )
      .then( res => {
        setIsLoading(false);

        if(res.ok){
          const data = res.json(); 
          authCtx.login(data.idToken); // sending in the value of idToken to the context
          // file so that it can be stored there in the app-wide state manager context 
        }else{
          return res.json().then( data => { 
            let errorMessage = 'Authentication Failed'; 
            if(data && data.error.message){
              errorMessage = data.error.message;
            }

            alert(errorMessage); 
          })
        }
      })
    }else{ 
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJ5auP7kJWGIaBBmkmUS9Y8nDVj63j944',
        {
          method: 'POST',
          body: JSON.stringify({ 
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-type': 'application/json' 
          }
        }
        )
        .then(res => {
          setIsLoading(false);
          if(res.ok){

          }else{
            return res.json().then(data => {
              let errorMessage = 'Authentication Failed'; 
              if(data && data.error.message){
                errorMessage = data.error.message;
              }

              alert(errorMessage); 
            }); 
          }
        })
    }

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>

          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
