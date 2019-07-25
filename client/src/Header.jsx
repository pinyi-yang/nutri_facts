import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const Header = props => {
    var user = props.user;
    
    if (user) {
      var userLogin = (
        <nav>
          <Link to='/' onClick={props.logout}>Logout</Link>
          <Link to='/dates'> Set Date</Link>
          <Link to='/summary'>Profile</Link>
        </nav>
      )
    } else {
      var userLogin = (
        <nav>
          <Link to='/login' >Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </nav>
      );
    }
    return (
      <header className="App-header">
        <a><img id="header-img" src="/nutri-facts.png" alt=""/></a>
        {userLogin}
        {/* <nav> */}
          {/* <button onClick={props.logout}>Logout</button> */}
          {/* <Link to='/login' >Login</Link>
          <Link to='/signup'>Sign Up</Link> */}
        {/* </nav> */}
      </header>
    );
}

export default Header;