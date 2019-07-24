import React from 'react';

const MealOptions = props => (
  <div className='meals-options-list'>
    {props.options.map((option, i) => (
      <div className='meals-option' key={i}>
        {option}
        <button>Select</button>
      </div>
    ))}
  </div>
)

export default MealOptions;