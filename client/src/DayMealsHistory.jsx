import React from 'react';
import moment from 'moment';

const DayMealsHistory = props => {
  let meals = props.meals;

  if (meals.length > 0) {
    var content = <div className='message-div'>
        pending
  </div>
  } else {
    content = <div className='message-div'>
      Ooopss, you haven't eaten anything yet. Let's find you a healthy meal.
    </div>
  } 

  return (
    <div className='day-meals-history'>
      <div className='meal-history-title'>
        <b>Hi, {props.user.name}</b>
        <div id='meal-history-title-date'>
          {moment().format('dddd, MMMM Do YYYY	')}
        </div>
      </div>

      <div className='meal-history-meals'>
        {content}
      </div>
    </div>
  );
}

export default DayMealsHistory;