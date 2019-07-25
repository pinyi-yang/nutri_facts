import React from 'react';

const MealOptions = props => (
  <div className='meals-options-list'>
    {props.options.map((option, i) => (
      <div className='meals-option' 
            key={i}
            style={{backgroundImage: "url(" + option.image + ")"}}
            onMouseOver={() => props.handleHoverOption(i)}
            onMouseLeave={props.handleOffOption}
            onClick={() => props.handleMealOptionSelect(option, props.type)}>
        {option.name}
      </div>
    ))}
  </div>
)

export default MealOptions;