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
    {y: '100kcal', x: 0},
    {y: 'Protain', x: 0},
    {y: 'Fiber', x: 0},
    {y: 'Fat', x: 0},
    {y: 'Carbs', x: 0}
  ]; 
   //  ['100kcal', 'Protain', 'Fiber', 'Carbs', 'Fat']
   if (props.goal && props.meals) {
     let goal = props.goal;
     console.log(goal);
     let meals = props.meals
     goalData = [
       {y: '100kcal', x: goal.calories, x1:50},
       {y: 'Protain', x: goal.protein},
       {y: 'Fiber', x: goal.fiber},
       {y: 'Fat', x: goal.fat},
       {y: 'Carbs', x: goal.carbs}
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
    //  console.log(meals);
     console.log(mealsData);
   }
        
  return (
    <div className='day-meals-chart'>
      <form>
        <input type='date' value={props.date}/> {' '}
        <input type='submit' value='GO' />
      </form>
      <XYPlot height={200} width={400} colorType="category" yType="ordinal" margin={{left: 50}}>
        {/* <DiscreteColorLegend 
          items={[
            {title: "Goals"},
            {title: "Meals"}
          ]} 
          style={{position: 'absolute', right: '25px', top: '70px'}}
        /> */}
        <HorizontalBarSeries data={mealsData.slice(0,-2)}  color="#61ff69" cluster='nutri' barWidth={0.72}/>
        <HorizontalBarSeries data={mealsData.slice(-2)}  color='#ff6961' cluster='nutri' barWidth={0.72}/>
        <HorizontalBarSeries data={goalData} color="rgba(255,255,255,0)" cluster='nutri' stroke="#ffb861" style={{strokeWidth: 2}}/>
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <YAxis tickPadding={0.5} style={{ text:{fill:'black'}, line: {stroke: 'grey'} }}/>
        <XAxis style={{ text:{fill:'black'}, line: {stroke: 'grey'} }}/>
      </XYPlot>
    </div>
  );
}
  


export default DayMealsCharts;