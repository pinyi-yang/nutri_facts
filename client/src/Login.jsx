import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((res) => {
      if (res.data.type === 'error') {
        this.setState({
          message: res.data.message
        })
      } else {
        localStorage.setItem('mernToken', res.data.token);
        this.props.liftToken(res.data);
      }
    }).catch((err) => {
      console.log('login error is ', err);
      this.setState ({
        message: "Maximum login attemps exceeded. Please try again later."
      })
    }) 
  }
  

  render() {

    return (
    <div className="Login">
      <h3>Login into your account:</h3>
      <form onSubmit={this.handleSubmit}>
        Email: <br/>
        <input onChange={this.handleEmailChange} 
                value = {this.state.email} 
                type ='email' 
                name = 'email' 
                placeholder = 'Enter your email' />
                <br/><br/>
        Password: <br/>
        <input onChange={this.handlePasswordChange}
                value = {this.state.password}
                type='password'
                name='password'
                placehoder='Enter your password' />
                <br/><br/>
        <input type='submit' value='Login' />
      </form>
    </div>
    );
  }
}

export default Login;