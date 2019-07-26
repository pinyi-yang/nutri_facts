import React from 'react';
import MealOptions from './MealOptions';
import axios from 'axios';
import MealOptionIndicator from './MealOptionIndicator';

class AddMealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: '',
      dishes: '',
      type: '',
      options: [],
      message: '',
      mouseOnOption: null
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDishesChange = this.handleDishesChange.bind(this);
    this.handleFoodsChange = this.handleFoodsChange.bind(this);
    this.handleShowMeal = this.handleShowMeal.bind(this);
    this.handleHoverOption = this.handleHoverOption.bind(this);
    this.handleOffOption = this.handleOffOption.bind(this);
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
    console.log('get meals from api');
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
      axios.post('/api/foodsearch', {foodsArr}).then(res => {
        console.log('get dat from api');
        let option = res.data;
        // option.type = this.state.type;
        // console.log('meal type is', option.type);
        this.setState({
          options: option,
          foods: '',
          dishes: '',
          message: ''
        })
        console.log('the food is', this.state.options);
      })
    } else if (dishes) {
      console.log('look for dish in backend', dishesArr[0]);
      axios.post('/api/dishsearch',{dishesArr}).then(res => {
        console.log('get dish from api');
        this.setState({
          options: res.data,
          foods: '',
          dishes: '',
          message: ''
        })
      })
    } else {
      this.setState({
        message: 'Please input a food or dish'
      })
    }

    
  }
  
  handleHoverOption(i) {
    let newOption = this.state.options[i];
    this.setState({
      mouseOnOption: newOption
    })
  }

  handleOffOption() {
    this.setState({
      mouseOnOption: null
    })
  }

  render() {

    if (this.state.dishes || this.state.foods || this.state.options.length>0) {
      var content = (
        this.state.message === 'Loading Data' ? 
          <img src='./gif/loading.gif' alt={this.state.message} id='loadinggif'/> :
          <div className='meals-options-container'> 
            <MealOptions options={this.state.options} 
                          handleMealOptionSelect={this.props.handleMealOptionSelect}
                          type={this.state.type}
                          handleHoverOption={this.handleHoverOption}
                          handleOffOption={this.handleOffOption}
                          />
            <MealOptionIndicator 
              option={this.state.mouseOnOption} 
            />
          </div>
      )
    } else {
      content = <div className='message-div'>
        input foods name or dish to continue, click to add to your pending list
      </div>
    }

    return (
      <div className='info-sub' id='add-meal-container'>
        <div className='add-meal-form'>
          <form onSubmit={this.handleShowMeal}>
            <div className="type">
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

            <div className="type">
              Add Foods:
              <input type='text' name='foods' value={this.state.foods} onChange={this.handleFoodsChange} placeholder='names for food'/>
              {' '}
              <input type='submit' value='SHOW' />
            </div>

            <div className="type">
              Add a Dish:
              <input type='text' name='dish' value={this.state.dishes} onChange={this.handleDishesChange} placeholder='name for dish' />
              {' '}
              <input type='submit' value='SHOW' />
            </div>
          </form>
        </div>
        
        <div className='meals-options-list-div'>
          {content}
          {/* {this.state.message === 'Loading Data' ? 
            <img src='./gif/loading.gif' alt={this.state.message} id='loadinggif'/> :
            <div className='meals-options-container'> 
              <MealOptions options={this.state.options.slice(this.state.optionsViewPort, this.state.optionsViewPort+4)} 
                            handleMealOptionSelect={this.props.handleMealOptionSelect}
                            type={this.state.type}
                            handleHoverOption={this.handleHoverOption}
                            handleOffOption={this.handleOffOption}
                            />
              <MealOptionIndicator 
                option={this.state.mouseOnOption} 
              />
            </div>
          } */}
        </div>
      </div>
    );
  }
} 


export default AddMealForm;