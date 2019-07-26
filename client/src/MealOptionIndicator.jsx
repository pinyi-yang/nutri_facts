import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot,
        FlexibleXYPlot,
        FlexibleWidthXYPlot,
        FlexibleHeightXYPlot, 
        VerticalBarSeries,
        HorizontalBarSeries,
        XAxis,
        YAxis,
        DiscreteColorLegend,
        } from 'react-vis';

const MealOptionIndicator = props => {
  const nutrientsKeys = ['ENERC_KCAL', 'PROCNT', 'FIBTG', 'FAT', 'CHOCDF']
  const yticks = ['', '100kcal', 'Protain', 'Fiber', 'Fat', 'Carbs']
  let mealsData = [
    {y: '100kcal', x: 0},
    {y: 'Protain', x: 0},
    {y: 'Fiber', x: 0},
    {y: 'Fat', x: 0},
    {y: 'Carbs', x: 0}
  ]; 
  let food = props.option
  
  if (food) {
    for (let key in food.nutrients) {
      let value = food.nutrients[key]
      key === 'ENERC_KCAL' ? value = value/100 : value=value; 
      mealsData[nutrientsKeys.indexOf(key)].x += value;
    }
    
    var content = <FlexibleXYPlot margin={{left: 50}} yType="ordinal">
                    <HorizontalBarSeries data={mealsData.slice(0,-2)}  color="#59b953" cluster='meal'/>
        <HorizontalBarSeries data={mealsData.slice(-2)}  color='red' cluster='meal'/>
                    <YAxis tickPadding={0.5}/>
                    <XAxis />
                  </FlexibleXYPlot>

  } else {
    content = <div className='message-div'>
      mouse over a food for details
    </div>
  }

  return (
    <div className='meal-option-nutri-indicator'>
       {content}
    </div>
  )
}

export default MealOptionIndicator;