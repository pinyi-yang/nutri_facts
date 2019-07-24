import React from 'react';
import './App.css';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import LandingPage from './LandingPage'
import Header from './Header';
import Summary from './Summary';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
    var contents = (
      <Route exact path='/' render={() => (
        <LandingPage liftToken={this.liftToken} />
      )}
      />
    );
    if (user) {
      //have a user
      contents = (
        <Route exact path='/' render={() => (
          <Home liftToken={this.liftToken} user={user}/>
        )}
        />
      )
    }

    return (
      <Router>
        <Header logout={this.logout} user={user}/>

        {contents}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/login" render={(props) => (
          <Login {...props} liftToken={this.liftToken}/>
        )} />
        <Route exact path="/signup" render={(props) => (
          <Signup {...props} liftToken={this.liftToken}/>
        )} />
        <Route exact path="/summary" render={(props) => (
          <Summary {...props} user={this.state.user} liftToken={this.liftToken} />
        )} />
      </Router>
    );
  }
}

export default App;
