import {useContext} from 'react'; // importing the useContext hook from react library

import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context'; //importing the AuthContext file

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext); // using the useContext hook 
  const isLoggedIn = authCtx.isLoggedIn; // assigning the value of isLoggedIn to be the 
  // value tha we get from the Context state manager  

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>

          { !isLoggedIn &&  // showing the Login button on navigation bar if the user is
          // not logged in already 
            (<li>
              <Link to='/auth'>Login</Link>
            </li>)
          }
          {isLoggedIn && ( // showing the Profile button if the user is logged in already
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && ( // showing the logout button when the user is logged in already
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
