import React from 'react';
import MealOptions from './MealOptions';
import axios from 'axios';


class AddMealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: '',
      dishes: '',
      type: '',
      options: [],
      message: '',
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDishesChange = this.handleDishesChange.bind(this);
    this.handleFoodsChange = this.handleFoodsChange.bind(this);
    this.handleShowMeal = this.handleShowMeal.bind(this);
  }

  handleTypeChange(e) {
    this.setState({
      type: e.target.value
    })
  }

  handleFoodsChange(e) {
    this.setState({
      foods: e.target.value,
      dishes: '',
    })
  }

  handleDishesChange(e) {
    this.setState({
      foods: '',
      dishes: e.target.value,
    })
  }

  handleShowMeal(e) {
    e.preventDefault();
    this.setState({
      message: 'Loading Data'
    })
    let {foods, dishes} = this.state;
    let foodsArr;
    let dishesArr;
    foods ? foodsArr = foods.split(/,\s*/) : foodsArr=[];
    dishes ? dishesArr = dishes.split(/,\s*/) : dishesArr=[];

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('mernToken');
    
    if (foods) {
      axios.post('/api', {foodsArr, dishesArr}).then(res => {
        console.log(res.data);
        let option = res.data;
        // option.type = this.state.type;
        // console.log('meal type is', option.type);
        this.setState({
          options: option,
          foods: '',
          dishes: ''
        })
        console.log('the food is', this.state.options);
      })
    } else if (dishes) {

    } else {
      this.setState({
        message: 'Please input a food or dish'
      })
    }


  }

  render() {
    return (
      <div className='info-sub' id='add-meal-container'>
        <div className='add-meal-form'>
          <form onSubmit={this.handleShowMeal}>
            <div>
              Type: 
              <select name='type' onChange={this.handleTypeChange}>
                <option value=''>--</option>
                <option value='breakfast'>Breakfast</option>
                <option value='lunch'>Lunch</option>
                <option value='snack'>Snack</option>
                <option value='supper'>Supper</option>
                <option value='dessert'>Dessert</option>
              </select>
            </div>

            <div>
              Add Foods:
              <input type='text' name='foods' value={this.state.foods} onChange={this.handleFoodsChange} placeholder='names for food'/>
              {' '}
              <input type='submit' value='SHOW' />
            </div>

            <div>
              Add a Dish:
              <input type='text' name='dish' value={this.state.dishes} onChange={this.handleDishesChange} placeholder='name for dish' />
              {' '}
              <input type='submit' value='SHOW' />
            </div>
          </form>
        </div>
        <div className='meals-options-list-div'>
          {this.state.options.length === 0 ? 
            <img src='../public/gif/loading.gif' alt={this.state.message} id='loadinggif'/> : 
            <MealOptions options={this.state.options} 
                          handleMealOptionSelect={this.props.handleMealOptionSelect}
                          type={this.state.type}
                          /> 
          }
        </div>
      </div>
    );
  }
} 


export default AddMealForm;