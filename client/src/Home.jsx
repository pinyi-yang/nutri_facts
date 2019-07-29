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
      pendingdate: moment().format('YYYY-MM-DD'),
      type: '',
      message: ''
    }
  
    this.handleAddMealClick = this.handleAddMealClick.bind(this);
    this.handleMealOptionSelect = this.handleMealOptionSelect.bind(this);
    this.handlePendingOptionRemove = this.handlePendingOptionRemove.bind(this);
    this.handEnjoyMealClick = this.handEnjoyMealClick.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
    this.handleDateChangeSubmit = this.handleDateChangeSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    if (this.state.pendingMeal.length > 0) {
      let foods = this.state.pendingMeal.slice();
      let mealscopy = this.state.meals.slice();
      let type = this.state.type;
      let newmeal = {
        food: foods,
        type: type
      }
      console.log(newmeal);
      mealscopy.push(newmeal);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
      axios.post(`/api/users/${this.props.user._id}/meals`, {foods, type}).then(res => {
        console.log('added new meal');
        this.setState({
          meals: mealscopy,
          pendingMeal: [],
          addMeal: false,
          type: ''
        })
      })
    }
  }

  deleteMeal(index) {
    let mealscopy = this.state.meals.slice();
    // //todo take meal out of db
    console.log('delete meal', index)
    console.log(`take meal ${this.state.meals[index]._id}`)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.delete(`/api/meals/${this.state.meals[index]._id}`).then(res => {
      console.log(res.data)
    })
    
    //todo take meal out of state.meals
      //? meals is array >>> take out an item from array
    mealscopy.splice(index, 1);
    this.setState({
      meals: mealscopy
    })
    
  }

  handleDateChangeSubmit(e) {
    e.preventDefault();
    console.log(this.state.pendingdate);
    let newdate = this.state.pendingdate
    this.setState({
      date: newdate
    })

    console.log('get meal from user');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    axios.get(`/api/users/${this.props.user._id}/meals?start=${this.state.pendingdate}&end=${this.state.pendingdate}`).then(res => {
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

  handleDateChange(e) {
    this.setState({
      pendingdate: e.target.value
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

          <DayMealsHistory date={this.state.date} meals={this.state.meals} user={this.props.user} deleteMeal={this.deleteMeal}/>
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
          <div className='day-meals-chart'>
            <form onSubmit={this.handleDateChangeSubmit}>
              <input type='date' value={this.state.pendingdate} onChange={this.handleDateChange}/> {' '}
              <input type='submit' value='GO' />
            </form>
            <DayMealsCharts goal={this.state.goal} meals={this.state.meals} date={this.state.date}/>
          </div>
          {infosub}
        </div>
      </div>
    );
  }
}

export default Home;