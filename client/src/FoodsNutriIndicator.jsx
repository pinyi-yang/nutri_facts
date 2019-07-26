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


const FoodsNutriIndicator = props => {
  const nutrientsKeys = ['ENERC_KCAL', 'PROCNT', 'FIBTG', 'FAT', 'CHOCDF']
  const yticks = ['', '100kcal', 'Protain', 'Fiber', 'Fat', 'Carbs']
  let foods = props.foods.food;
  console.log(foods);
  let mealsData = [
    {y: '100kcal', x: 0},
    {y: 'Protain', x: 0},
    {y: 'Fiber', x: 0},
    {y: 'Fat', x: 0},
    {y: 'Carbs', x: 0}
  ]; 

  if (foods.length > 0) {
    foods.forEach(function(food) {
      for (let key in food.nutrients) {
        let value = food.nutrients[key]
        key === 'ENERC_KCAL' ? value = value/100 : value=value;
        console.log(key, value); 
        mealsData[nutrientsKeys.indexOf(key)].x += value;
      }
    })
  }
  console.log(mealsData);

  return (
    <div className='foods-nutri-indicator'>
      <FlexibleWidthXYPlot height={150} margin={{left: 50}} yType="ordinal">
        <HorizontalBarSeries data={mealsData.slice(0,-2)}  color="#59b953" cluster='meal'/>
        <HorizontalBarSeries data={mealsData.slice(-2)}  color='red' cluster='meal'/>
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickPadding={0.5} />
        <XAxis />
      </FlexibleWidthXYPlot>
    </div>
  );
}

export default FoodsNutriIndicator;