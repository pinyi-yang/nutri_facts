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
    {y: 1, x: 0},
    {y: 2, x: 0},
    {y: 3, x: 0},
    {y: 4, x: 0},
    {y: 5, x: 0}
  ]; 
  let food = props.option
  
  if (food) {
    for (let key in food.nutrients) {
      let value = food.nutrients[key]
      key === 'ENERC_KCAL' ? value = value/100 : value=value; 
      mealsData[nutrientsKeys.indexOf(key)].x += value;
    }
    
    var content = <FlexibleXYPlot stackBy='x'>
                    <HorizontalBarSeries data={mealsData} />
                    {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
                    <YAxis tickFormat={v => yticks[v]}/>
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