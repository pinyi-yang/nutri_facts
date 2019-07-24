import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: '',
      fat: '',
      protein: '',
      fiber: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(`/user/${this.props.user._id}/goals`)
    axios.post(`/user/${this.props.user._id}/goals`, {
      calories: this.state.calories,
      fat: this.state.fat,
      protein: this.state.protein,
      fiber: this.state.fiber
    }).then(res => {
      if (res.data.type === 'error') {
        this.setState({
          calories: '',
          fat: '',
          protein: '',
          fiber: ''
        })
      } 
    })
  }

  render() {
    var name = this.props.user ? this.props.user.name : '';
    return (
      <div className="summaryPage">
        Summary Page
        <p>Hello, {name}</p>
        <h3>Set a Goal:</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} type="text" name="calories" placeholder="Enter calories..."/>
          <input onChange={this.handleInputChange} type="text" name="fat" placeholder="Enter fat..."/>
          <input onChange={this.handleInputChange} type="text" name="protein" placeholder="Enter protein..."/>
          <input onChange={this.handleInputChange} type="text" name="fiber" placeholder="Enter fiber..."/>
          <input type="submit"/>
        </form>
        <Link to='/'>Home</Link>
        <p>{this.state.calories},{this.state.fat},{this.state.protein},{this.state.fiber}</p>
      </div>
    )
  }
}

export default Summary;