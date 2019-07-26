import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import moment from 'moment';
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

const PendingMealNutri = props => {
  const nutrientsKeys = ['ENERC_KCAL', 'PROCNT', 'FIBTG', 'FAT', 'CHOCDF']
  const yticks = ['', '100kcal', 'Protain', 'Fiber', 'Fat', 'Carbs']
  let mealsData = [
    {y: 1, x: 0},
    {y: 2, x: 0},
    {y: 3, x: 0},
    {y: 4, x: 0},
    {y: 5, x: 0}
  ]; 
  if (props.pendingMeal.length > 0) {
    props.pendingMeal.forEach(function(food) {
      for (let key in food.nutrients) {
        let value = food.nutrients[key]
        key === 'ENERC_KCAL' ? value = value/100 : value=value; 
        mealsData[nutrientsKeys.indexOf(key)].x += value;
      }
    })
  }

  return (
    <div className='pending-meal-nutri'>
      <FlexibleXYPlot stackBy='x'>
        <HorizontalBarSeries data={mealsData} />
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickFormat={v => yticks[v]}/>
        <XAxis />
      </FlexibleXYPlot>
    </div>
  );
} 

export default PendingMealNutri;
       