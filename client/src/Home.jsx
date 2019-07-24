import React from 'react';
import DayMealsCharts from './DayMealsCharts';
import DayMealsHistory from './DayMealsHistory';
import DayMealsRecomm from './DayMealsRecomm';
import ProfileBar from './ProfileBar';
import AddMealForm from './AddMealForm';
import PendingMeal from './PendingMeal';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      pendingMeal: [],
      addMeal: false
    }
    this.handNewMealSubmit = this.handNewMealSubmit.bind(this);
    this.handleAddMealClick = this.handleAddMealClick.bind(this);
    this.handleMealOptionSelect = this.handleMealOptionSelect.bind(this);
    this.handlePendingOptionRemove = this.handlePendingOptionRemove.bind(this);
  }

  handleAddMealClick() {
    this.setState({
      addMeal: !this.state.addMeal
    })
  }

  //add options to pending meal
  handleMealOptionSelect(option) {
    console.log('add food to pending', option);
    let pendingMealCopy = this.state.pendingMeal.slice();
    pendingMealCopy.push(option);
    this.setState(
      {
        pendingMeal: pendingMealCopy
      }
    )  
  }

  //remove option from pendingMeal
  handlePendingOptionRemove(e) {
    let index = parseInt(e.target.value);
    let pendingMealCopy = this.state.pendingMeal.slice();
    pendingMealCopy.splice(index, 1);
    this.setState(
      {
        pendingMeal: pendingMealCopy
      }
    ) 
  }

  handNewMealSubmit(e, foods, dishes, type) {
    e.preventDefault();
    let foodsarr = foods.split(/,\s*/);
    let dishesarr = dishes.split(/,\s*/);
    console.log(foodsarr, dishesarr, type);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.post(`/api/users/${this.props.user._id}/meals`, {foodsarr, dishesarr, type})
  }



  render() {
    const goals = [
      {x: 1, y: 8},
      {x: 2, y: 5},
      {x: 3, y: 4},
      {x: 4, y: 9},
      {x: 5, y: 1},
      {x: 6, y: 0}
    ];
    const meals = [
      {x: 1, y: 4},
      {x: 2, y: 3},
      {x: 3, y: 2},
      {x: 4, y: 6},
      {x: 5, y: 0.5}
    ]


    if (this.state.addMeal) {
      var infosub = (
        <>
          <AddMealForm handleMealOptionSelect={this.handleMealOptionSelect}/>
          <PendingMeal pendingMeal={this.state.pendingMeal} handlePendingOptionRemove={this.handlePendingOptionRemove}/>
        </>
      )
    } else {
      infosub = (
        <>
          <DayMealsRecomm />
          <DayMealsHistory />
        </>
      )
    }
    return (
      <div className='main'>

        <ProfileBar 
                  user={this.props.user}
                  handNewMealSubmit={this.handNewMealSubmit}
                  handleAddMealClick={this.handleAddMealClick}
                  />


        <div className='info day-meals-container'>
          <DayMealsCharts goals={goals} meals={meals}/>
          {infosub}
        </div>
      </div>
    );
  }
}

export default Home;