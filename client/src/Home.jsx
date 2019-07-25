import React from 'react';
import DayMealsCharts from './DayMealsCharts';
import DayMealsHistory from './DayMealsHistory';
import DayMealsRecomm from './DayMealsRecomm';
import ProfileBar from './ProfileBar';
import AddMealForm from './AddMealForm';
import PendingMeal from './PendingMeal';
import axios from 'axios';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      goal: null,
      pendingMeal: [],
      addMeal: false,
      date: moment().format('YYYY-MM-DD'),
      type: '',
      message: ''
    }
  
    this.handleAddMealClick = this.handleAddMealClick.bind(this);
    this.handleMealOptionSelect = this.handleMealOptionSelect.bind(this);
    this.handlePendingOptionRemove = this.handlePendingOptionRemove.bind(this);
    this.handEnjoyMealClick = this.handEnjoyMealClick.bind(this);
  }

  handleAddMealClick() {
    this.setState({
      addMeal: !this.state.addMeal
    })
  }

  //add options to pending meal
  handleMealOptionSelect(option, type) {
    console.log('add food to pending', option);
    let pendingMealCopy = this.state.pendingMeal.slice();
    pendingMealCopy.push(option);
    this.setState(
      {
        pendingMeal: pendingMealCopy,
        type
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

  handEnjoyMealClick() {
    let newmeal = this.state.pendingMeal.slice();
    let mealscopy = this.state.meals.slice();
    let type = this.state.type;
    mealscopy.push(newmeal);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.post(`/api/users/${this.props.user._id}/meals`, {newmeal, type}).then(res => {
      console.log('added new meal');
      this.setState({
        meals: mealscopy,
        pendingMeal: [],
        addMeal: false,
        type: ''
      })
    })
  }

  componentDidMount() {
    console.log('get meal from user');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(`/api/users/${this.props.user._id}/meals?start=${this.state.date}&end=${this.state.date}`).then(res => {
      let {messageType, meals, goals} = res.data;
      if (messageType === 'success') {
        this.setState({
          meals,
          goal: goals[goals.length-1]
        })
      } else {
        console.log('error, could not get meals and goal info from user');
        this.setState({
          message: 'error, could not get meals and goal info from user'
        })
      }
      
    })
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
          <PendingMeal 
            pendingMeal={this.state.pendingMeal} handlePendingOptionRemove={this.handlePendingOptionRemove}
            handEnjoyMealClick={this.handEnjoyMealClick}
          />
        </>
      )
    } else {
      infosub = (
        <>
          {/* <DayMealsRecomm /> */}
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
          <DayMealsCharts goals={goals} meals={meals} date={this.state.date}/>
          {infosub}
        </div>
      </div>
    );
  }
}

export default Home;