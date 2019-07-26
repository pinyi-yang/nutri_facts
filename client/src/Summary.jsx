import React from 'react';
import axios from 'axios';
import ProfileBar from './ProfileBar';
import Header from './Header';
import jwt from 'jsonwebtoken'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { deflateRawSync } from 'zlib';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      calories: '',
      fat: '',
      protein: '',
      fiber: '',
      carbs: '',
      goal: null
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
      fiber: this.state.fiber,
      carbs: this.state.carbs
    }).then(res => {
      if (res.data.type === 'error') {
        this.setState({
          calories: '',
          fat: '',
          protein: '',
          fiber: '',
          carbs: ''
        })
      } 
    })
  }

  componentDidMount() {
    // let token = localStorage.getItem('mernToken');
    // console.log('local token', token);
    console.log(this.props.user)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(`/api/users/${this.props.user._id}`).then(res => {
      console.log(res)
      let {messageType, goals} = res.data;
      if (messageType === 'success') {
        let goal = goals[goals.length-1];
        if (goal) {
          this.setState({
            goal,
            calories: goal.calories,
            fat: goal.fat,
            protein: goal.protein,
            fiber: goal.fiber,
            carbs: goal.carbs
          }) 
        } else {
          this.setState({
            message: 'error, could not get goals info from user',
            calories: '',
            fat: '',
            protein: '',
            fiber: '',
            carbs: ''
          })
        }
      } 
    })
  }

  render() {
    var name = this.props.user ? this.props.user.name : '';
    // let calories = this.state.goal ? this.setState({calories: this.state.goal.calories}): '';
    // let fat = this.state.goal ? this.setState({fat: this.state.goal.fat}): '';
    // let protein = this.state.goal ? this.setState({protein: this.state.goal.protein}): '';
    // let fiber = this.state.goal ? this.setState({fiber: this.state.goal.fiber}): '';
    // let carbs = this.state.goal ? this.setState({carbs: this.state.goal.carbs}): '';
    var goals
    return (
      
      <div className='main'>
      <ProfileBar 
                user={name}
                handNewMealSubmit={this.handNewMealSubmit}
                handleAddMealClick={this.handleAddMealClick}
                />
      <div id="profilePage" className='info day-meals-container'>
        <p>Hello, {name}</p>
        <h3>Set a Goal:</h3>
        {/* <p>Calories: {this.state.calories} Fat: {this.state.fat} Protein: {this.state.protein} Fiber: {this.state.fiber}</p> */}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange} value={this.state.calories} type="text" name="calories" placeholder="Enter calories..."/>
          <input onChange={this.handleInputChange} value={this.state.fat} type="text" name="fat" placeholder="Enter fat..."/>
          <input onChange={this.handleInputChange} value={this.state.protein} type="text" name="protein" placeholder="Enter protein..."/>
          <input onChange={this.handleInputChange} value={this.state.fiber} type="text" name="fiber" placeholder="Enter fiber..."/>
          <input onChange={this.handleInputChange} value={this.state.carbs} type="text" name="carbs" placeholder="Enter carbs..."/><br/>
          <input className="goalSubmit" type="submit"/>
        </form>

        <div className="userGoal">
          <p>Calories: {this.state.calories}kcal</p> 
          <p>Fat: {this.state.fat}g</p>
          <p>Protein: {this.state.protein}g</p>
          <p>Fiber: {this.state.fiber}g</p>
          <p>Carbs: {this.state.carbs}g</p>
        </div>
        </div>

      </div>
    )
  }
}

export default Summary;