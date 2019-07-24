import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import moment from 'moment';
import {XYPlot, 
        VerticalBarSeries,
        XAxis,
        YAxis,
        DiscreteColorLegend,
        } from 'react-vis';


const DayMealsCharts = props => {
  const xticks = ['fiber', 'suger', 'fat', 'carbonhydrate', 'sodium', 'whatever']
  return (
    <div className='day-meals-chart'>
      <form>
        <input type='date' value={props.date}/> {' '}
        <input type='submit' value='GO' />
      </form>
      <XYPlot height={200} width={300} stackBy='y'>
        <DiscreteColorLegend 
          items={[
            {title: "Goals"},
            {title: "Meals"}
          ]} 
          style={{position: 'absolute', right: '15px', top: '10px'}}

        />
        <VerticalBarSeries data={props.goals} />
        <VerticalBarSeries data={props.meals} />
        {/* <XAxis tickValues={[1, 2, 3, 4, 5]}/> */}
        <XAxis tickFormat={v => xticks[v]} tickLabelAngle={-45}/>
        <YAxis />
      </XYPlot>
    </div>
  );
}
  


export default DayMealsCharts;