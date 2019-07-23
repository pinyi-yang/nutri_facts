import React from 'react';
import Login from './Login';
import Signup from './Signup';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const Header = (props) => {
  return (
      <header className="App-header">
        <img id="header-img" src="/nutri-facts.png" alt=""/>
        <button onClick={props.logout}>Logout</button>
        <Link to='/login' >Login</Link>
        <button onClick={props.signup}>Sign Up</button>
      </header>
  )
}

export default Header;