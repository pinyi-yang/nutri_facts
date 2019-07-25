import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import moment from 'moment';
import {XYPlot, 
        VerticalBarSeries,
        HorizontalBarSeries,
        XAxis,
        YAxis,
        DiscreteColorLegend,
        } from 'react-vis';


const DayMealsCharts = props => {
  const nutrientsKeys = ['ENERC_KCAL', 'PROCNT', 'FIBTG', 'FAT', 'CHOCDF']
  const yticks = ['', '100kcal', 'Protain', 'Fiber', 'Fat', 'Carbs']
  let goalData=[];
  let mealsData = [
    {y: 1, x: 0},
    {y: 2, x: 0},
    {y: 3, x: 0},
    {y: 4, x: 0},
    {y: 5, x: 0}
  ]; 
   //  ['100kcal', 'Protain', 'Fiber', 'Carbs', 'Fat']
   if (props.goal && props.meals) {
     let goal = props.goal;
     console.log(goal);
     let meals = props.meals
     goalData = [
       {y: 1, x: goal.calories},
       {y: 2, x: goal.protein},
       {y: 3, x: goal.fiber},
       {y: 4, x: goal.fat},
       {y: 5, x: 300}
     ];

     meals.forEach(function(meal) {
       meal.food.forEach(function(food) {
         for (let key in food.nutrients) {
           let value = food.nutrients[key]
           key === 'ENERC_KCAL' ? value = value/100 : value=value; 
           mealsData[nutrientsKeys.indexOf(key)].x += value;
         }
       })
     })
     console.log(meals);
     console.log(mealsData);
   }
        
  return (
    <div className='day-meals-chart'>
      <form>
        <input type='date' value={props.date}/> {' '}
        <input type='submit' value='GO' />
      </form>
      <XYPlot height={200} width={400} stackBy='x'>
        <DiscreteColorLegend 
          items={[
            {title: "Goals"},
            {title: "Meals"}
          ]} 
          style={{position: 'absolute', right: '25px', top: '70px'}}

        />
        <HorizontalBarSeries data={goalData} />
        <HorizontalBarSeries data={mealsData} />
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickFormat={v => yticks[v]}/>
        <XAxis />
      </XYPlot>
    </div>
  );
}
  


export default DayMealsCharts;