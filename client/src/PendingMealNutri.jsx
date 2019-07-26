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
    {y: '100kcal', x: 0},
    {y: 'Protain', x: 0},
    {y: 'Fiber', x: 0},
    {y: 'Fat', x: 0},
    {y: 'Carbs', x: 0}
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
      <FlexibleXYPlot margin={{left: 50}} yType="ordinal">
        <HorizontalBarSeries data={mealsData.slice(0,-2)}  color="#59b953" cluster='meal'/>
        <HorizontalBarSeries data={mealsData.slice(-2)}  color='red' cluster='meal'/>
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickPadding={0.5} />
        <XAxis />
      </FlexibleXYPlot>
    </div>
  );
} 

export default PendingMealNutri;
       