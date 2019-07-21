import React from 'react';
import DayMealsCharts from './DayMealsCharts';
import DayMealsHistory from './DayMealsHistory';
import DayMealsRecomm from './DayMealsRecomm';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    const goals = [
      {x: 1, y: 8},
      {x: 2, y: 5},
      {x: 3, y: 4},
      {x: 4, y: 9},
      {x: 5, y: 1},
      {x: 6, y: 0}
    ];
    const meals = [
      {x: 1, y: 4},
      {x: 2, y: 3},
      {x: 3, y: 2},
      {x: 4, y: 6},
      {x: 5, y: 0.5}
    ]

    return (
      <div claaName='info'>
        <DayMealsCharts goals={goals} meals={meals}/>
        <DayMealsRecomm />
        <DayMealsHistory />
      </div>
    );
  }
}

export default Home;