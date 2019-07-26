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
    {y: 1, x: 0},
    {y: 2, x: 0},
    {y: 3, x: 0},
    {y: 4, x: 0},
    {y: 5, x: 0}
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
      <FlexibleWidthXYPlot height={150} stackBy='x'>
        <HorizontalBarSeries data={mealsData} />
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickFormat={v => yticks[v]}/>
        <XAxis />
      </FlexibleWidthXYPlot>
    </div>
  );
}

export default FoodsNutriIndicator;