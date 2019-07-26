import React from 'react';
import PendingMealNutri from './PendingMealNutri';

const PendingMeal = props => {

  if (props.pendingMeal.length > 0) {
    var content = (
      <div className='pending-meal-container'>
        <div className='pending-meal-list'>
          {props.pendingMeal.map((option, i) => (
            <div className='pending-option' 
                  key={i}
                  style={{backgroundImage: "url(" + option.image + ")"}}>
              {option.name}
              <button value={i} onClick={props.handlePendingOptionRemove}>Remove</button>
            </div>
          ))}
        </div>
        <PendingMealNutri pendingMeal={props.pendingMeal}/>
      </div>
    )
  } else {
    content = <div className='message-div'>
      Waiting for Food, Click to Add.
    </div>
  }

  return(
    <div className='pending-meal-div'>
      {content}
    </div>

  ); 
}

export default PendingMeal;