import React from 'react';
import axios from 'axios';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value //name is form attribute, will take all value in the form
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.data.type === 'error') {
        this.setState({
          name: '',
          email: '',
          password: '',
          messag: res.data.message
        })
      } else {
        localStorage.setItem('mernToken', res.data.token);
        this.props.liftToken(res.data);
      }
    }).catch(err => {
      this.setState({
        message: "maximum accounts exceeded. Please try again."
      })
    })
  }


  render() {
    return (
      <div className='Signup'>
        <h3>Create a new account</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} type='text' value={this.state.name} name='name' placeholder='Enter your name here'/><br/>
          <input onChange={this.handleInputChange} type='text' value={this.state.email} name='email' placeholder='Enter your email here'/><br/>
          <input onChange={this.handleInputChange} type='password' value={this.state.password} name='password' placeholder='Enter your password here'/><br/>
          <input type='submit' value='Signup' />
        </form> 
      </div>
    );
  }
}

export default Signup;