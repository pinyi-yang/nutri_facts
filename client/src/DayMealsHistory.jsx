import React from 'react';
import moment from 'moment';
import MealHistroyMeals from './MealHistroyMeals';

const DayMealsHistory = props => {
  let meals = props.meals;

  if (meals.length > 0) {
    console.log(meals);
    var content = (
      <div className='meal-history-meals'>
        <MealHistroyMeals meals={meals} deleteMeal={props.deleteMeal}/>
      </div>
    )
  } else {
    content = 
    <div className='meal-history-meals'>
      <div className='message-div'>
        Ooopss, you haven't eaten anything yet. Let's find you a healthy meal.
      </div>
    </div>
  } 

  return (
    <div className='day-meals-history'>
      <div className='meal-history-title'>
        <b>Hi, {props.user.name}, </b>
        you eat {meals.length} times, {props.date === moment().format('YYYY-MM-DD')? 'today': ` on ${props.date}`}.
      </div>

      {content}
    </div>
  );
}

export default DayMealsHistory;