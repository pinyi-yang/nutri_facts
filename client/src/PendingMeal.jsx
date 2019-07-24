import React from 'react';

const PendingMeal = props => (
  <>
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
    <button onClick={props.handEnjoyMealClick}>Enjoy</button>
  </>
)

export default PendingMeal;