import React from 'react';

const MealOptions = props => (
  <div className='info-sub meals-options-container'>
    <div className='meals-options-list'>
      {props.options.map((option, i) => (
        <div className='meals-option' 
              key={i}
              style={{backgroundImage: "url(" + option.image + ")"}}>
          {option.name}
          <button onClick={() => props.handleMealOptionSelect(option, props.type)}>Select</button>
        </div>
      ))}
    </div>
    <div className='meal-option-nutri-indicator'>
      
    </div>
  </div>
)

export default MealOptions;