import React from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      // todo localStorage keep user login even after close browser
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // token is found, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          //if come back with an error
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken'); 
          this.setState({
            errorMessage: res.data.message,
            token: '',
            user: null
          })
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.setState({
            token: res.data.token,
            user: res.data.user,
            errorMessage: ''
          })
        }
      })

    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  logout() {
    //remove token from from localStorage
    localStorage.removeItem('mernToken');
    // Romve user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  componentDidMount() {
    this.checkForLocalToken();
  }

  render() {
    var user = this.state.user;
    var contents;
    if (user) {
      //have a user
      console.log(user);
      contents = (
        <>
          <p>Hello, {user.name}</p>
          <p onClick={this.logout}>Logout</p>
        </>
      );
    } else {
      //if no user
      contents = (
        <>
          <p>Please login</p>
          <Login liftToken = {this.liftToken} />
          <p>or signup</p>
          <Signup liftToken = {this.liftToken} />
        </>
      );
    }
    return (
      contents
    );
  }
}

export default App;
